if (typeof define !== 'function') {
	var define = require('amdefine')(module)
}

define(['./base_model'
	,'../util/logger_util'
	,'./category'
	,'./group'
	,'./category_group_phase_team'],
	(DB, logger) => {

	var Phase = DB.Model.extend({
		tableName: 'phases'
		,hasTimestamps: true
		,initialize: function() {
			this.on('saving', this.validate, this)
		}
		,validations: {
			name: ['required']
			// ,classified_team: ['required', 'numeric','greaterThan:0']
			// ,participant_team: ['required', 'numeric','greaterThan:0']
			,position: ['required', 'numeric','greaterThan:0']
		}
		,validate: function(model, attrs, options) {
			return DB.checkit(this.validations).run(this.toJSON())
		}
		//relations
		,groups:  function(){
			return this.hasMany('Group')
		}
		,category: function () {
			return this.belongsTo('Category', 'category_id')
		}
		,category_group_phase_team: function () {
			return this.hasMany('Category_group_phase_team', 'phase_id')
		}
		,createMatches: function(){
			if(this.get('position') == 1){
				this.load('groups')
				.then(phase => phase.related('groups').map(g => g.createMatches()))
			}
			else{
				let previous = null
				//obtengo la informacion de la fase anterior
				DB._models.Phase
				.where({category_id: this.get('category_id')
					,position: (this.get('position') - 1)
				})
				.fetch({withRelated: 'groups'})
				.then(previousPhase => {
					previous = previousPhase
					return this.load('groups')
				})
				.then(() => {
					//se crea un partido por grupo
					return Promise.all(
						this.related('groups')
						.map(group => group.createMatch())
					)
				})
				.then(matches => {
					const prevGroups = previous.related('groups').map(g => g.id)

					const homePlaceholders = matches.map(match => {
						const currentGroup = prevGroups.shift()
						if(currentGroup){
							match.set({placeholder_home_team_position: 1
								,placeholder_home_team_group: currentGroup
							})
						}
						return match.save()
					})
					
					const awayHomePlaceholders = matches.map(match => {
						const currentGroup = prevGroups.shift()
						if(currentGroup){
							match.set({placeholder_visitor_team_position: 1
								,placeholder_visitor_team_group: currentGroup
							})
						}
						return match.save()
					})

					return Promise.all(homePlaceholders.concat(awayHomePlaceholders))
				})
				.catch(e => {
					throw e
				})
			}
		}
	})

	// uses Registry plugin
	return DB.model('Phase', Phase)
})

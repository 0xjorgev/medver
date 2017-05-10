if (typeof define !== 'function')
	var define = require('amdefine')(module)

define(['./base_model'
	,'../util/logger_util'
	,'js-combinatorics'
	,'./phase'
	,'./round'], (DB
		,logger
		,Combinatorics
	) => {

	var Group = DB.Model.extend({
		tableName: 'groups',
		hasTimestamps: true,
		//relations
		phase: function(){
			return this.belongsTo('Phase', 'phase_id')
		}
		,rounds: function(){
			return this.hasMany('Round')
		}
		,category_group_phase_team: function(){
			return this.hasMany('Category_group_phase_team', 'group_id')
		}
		,standing_table: function(){
			return this.hasMany('StandingTable', 'group_id')
		}
		,matches: function(){
			return this.hasMany('Match', 'group_id')
		}
		//crea los partidos asociados a este grupo
		,createMatches: function(){
			//se genera un array con los numeros de 1 a <participant_team>
			const positions = [...Array(4).keys()].map(x => x+1)
			const matches = Combinatorics.combination(positions, 2)

			return this.load(['phase.category.season'])
			.then(() => {
				let initialDate = this.related('phase')
					.related('category')
					.related('season')
					.get('init_at')

				//se crean los partidos con el bare minimum
				return Promise.all(matches.toArray()
					.map((match, index) => {
						return DB._models.Match.forge({
							number: index + 1
							,group_id: this.id
							,date: initialDate
							,placeholder_home_team_group: this.id
							,placeholder_home_team_position: match[0]
							,placeholder_visitor_team_group: this.id
							,placeholder_visitor_team_position: match[1]
						})
						.save()
					})
				)
			})
		}
		,updateMatchPlaceholders: function(teamId, position){
			//TODO: evaluar si es realmente necesario remover la info de placeholders
			//actualizacion de home team
			return DB._models.Match
			.where({placeholder_home_team_group: this.id
				,placeholder_home_team_position: position})
			.fetchAll()
			.then(matches => {
				return Promise.all(matches.map(m =>
					m.save({home_team_id: teamId
							,placeholder_home_team_group: null
							,placeholder_home_team_position: null })))
			})
			//actualizacion de visitor team
			.then(matches => {
				return DB._models.Match
				.where({placeholder_visitor_team_group: this.id
					,placeholder_visitor_team_position: position})
				.fetchAll()
			})
			.then(matches => {
				return Promise.all(matches.map(m =>
					m.save({visitor_team_id: teamId
							,placeholder_visitor_team_group: null
							,placeholder_visitor_team_position: null })))
			})
			logger.debug(`position ${position} updated with team ${teamId}`)
		}
	})

	// uses Registry plugin
	return DB.model('Group', Group)
})

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
			return this.belongsTo('Phase', 'phase_id');
		}
		,rounds: function(){
			return this.hasMany('Round');
		}
		,category_group_phase_team: function(){
			return this.hasMany('Category_group_phase_team', 'group_id');
		}
		,standing_table: function(){
			return this.hasMany('StandingTable', 'group_id');
		}
		,matches: function(){
			return this.hasMany('Match', 'group_id');
		}
		,createMatches: function(){
			logger.debug(`group ${this.id} has ${this.attributes.participant_team} participant_teams`)

			//se genera un array con los numeros de 1 a <participant_team>
			const positions = [...Array(4).keys()].map(x => x+1)
			const matches = Combinatorics.combination(positions, 2)

			// while(match = matches.next()){
			// 	new Models.match({
			// 		number: matchNumber
			// 		,group_id: this.id
			// 		,placeholder_home_team_group: this.id
			// 		,placeholder_home_team_position: match[0]
			// 		,placeholder_visitor_team_group: this.id
			// 		,placeholder_visitor_team_position: match[1]
			// 	})
			// 	.save()
			// }

			let initialDate = null

			this.load(['phase.category.season'])
			.then(() => {
				initialDate = this.related('phase')
					.related('category')
					.related('season')
					.get('init_at')

				//se crean los partidos con el bare minimum
				return Promise.all(matches.toArray().map(match => {
					return DB._models.Match.forge({
						group_id: this.id
						,date: initialDate
						,placeholder_home_team_group: this.id
						,placeholder_home_team_position: match[0]
						,placeholder_visitor_team_group: this.id
						,placeholder_visitor_team_position: match[1]
					})
					.save()
				}))
			})

		}
	});

	// uses Registry plugin
	return DB.model('Group', Group);
});

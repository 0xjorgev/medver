if (typeof define !== 'function')
	var define = require('amdefine')(module)

define(['./base_model'
	,'../util/knex_util'
	,'../util/logger_util'
	,'js-combinatorics'
	,'./phase'
	,'./round'], (DB
		,Knex
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
			if(!this.get('participant_team') > 0){
				logger.error(`Group ${this.id} has no value in 'participant_team' field`)
				return
			}

			//Este algoritmo aplica para la 1era fase unicamente. El resto de las
			//fase no se calcula con la combinatoria
			
			//se genera un array con los numeros de 1 a <participant_team>
			const positions = [...Array(this.get('participant_team')).keys()].map(x => x+1)
			//Esta combinatoria aplica para la fase 1. Las fases > 1 deben ser ajustadas
			//manualmente
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
		,updateMatchPlaceholders: function(){

			const template = 'update matches set $TEAM_team_id = team_id '
			+ ' from categories_groups_phases_teams '
			+ ' where matches.group_id = ?'
			+ ' and categories_groups_phases_teams.group_id = matches.placeholder_$TEAM_team_group'
			+ ' and categories_groups_phases_teams.position_in_group = matches.placeholder_$TEAM_team_position'

			const homeQuery = template.replace(/\$TEAM/g, 'home')
			const awayQuery = template.replace(/\$TEAM/g, 'visitor')

			return Knex.raw(homeQuery, [this.id])
			.then(() => Knex.raw(awayQuery, [this.id]))
			.catch(e => {
				throw e
			})
		}
	})

	// uses Registry plugin
	return DB.model('Group', Group)
})

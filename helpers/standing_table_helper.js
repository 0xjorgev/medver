if (typeof define !== 'function') {
	var define = require('amdefine')(module)
}

define(['../util/knex_util'
	,'../node_modules/lodash/lodash.min'
	,'../model/index'
	,'../util/logger_util'
	,'../util/response_message_util'],
	(Knex
	,_
	,Models
	,logger
	,Response
	) => {
		let StandingTable = {}

		//==========================================================================
		// private functions. Contains the inner logic for the calculations
		//==========================================================================

		//dados los eventos de un match, se asignan los goles del evento al match por cada equipo, home o visitor
		const assignGoalsToTeams = events => {
			return match => {
				// Autogoals made by home team (this will be added to visitor teams goals)
				var home_team_autogoals = 0

				// Autogoals made by visitor team (this will be added to home teams goals)
				var visitor_team_autogoals = 0

				// The property "goals" in the object "event" is actually the count of the event
				events.forEach((event) => {
					if(event.match_id == match.match_id){

						// Setting Goals
						if (event.event_id == 1) {
							match.home_team_goals = (event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
							match.visitor_team_goals = (event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
						}

						// Setting own goals (autogoles)
						if (event.event_id == 4) {
							home_team_autogoals = (event.team_id == match.home_team_id) ? event.goals : home_team_autogoals
							visitor_team_autogoals = (event.team_id == match.visitor_team_id) ? event.goals : visitor_team_autogoals
						}
					}
				})

				// Adding own goals
				match.home_team_goals = match.home_team_goals + visitor_team_autogoals
				match.visitor_team_goals = match.visitor_team_goals + home_team_autogoals

				match.total_goals = match.home_team_goals + match.visitor_team_goals
				return match
			}
		}

		//dado un match, se le coloca dos propiedades para los scores de cada equipo
		const prepMatch = match => {
			match.home_team_goals = 0
			match.visitor_team_goals = 0
			match.total_goals = 0
			return match
		}

		//TODO: El valor de los puntos ganados debe tomarse de la config de la categoria
		const assignPointsByMatch = m => {
			if(m.home_team_goals == m.visitor_team_goals){
				m.home_team_points = 1
				m.visitor_team_points = 1
			}
			else{
				m.home_team_points = m.home_team_goals > m.visitor_team_goals ? 3 : 0
				m.visitor_team_points = m.home_team_goals < m.visitor_team_goals ? 3 : 0
			}
			return m
		}

		const setTeamResults = (team, match, matches) => {

			//ubico el match para obtener el id de la fase
			const found = matches.find(m => m.id == match.id)
			//con el id de fase, obtengo el grupo al que pertenece el equipo;
			//este group_id es el que se utiliza para la standing, para evitar
			//problemas con los juegos cruzados
			const teamGroup = team.related('category_group_phase_team')
				.find(spider => spider.get('phase_id') == found.phase_id)

			let result = {
				category_id: match.category_id,
				phase_id: match.phase_id,
				//este debe ser el grupo del equipo; no del match
				// group_id: match.group_id,
				group_id: teamGroup.get('group_id'),
				team_id: team.id,
				data: team, points: 0,
				goals_in_favor: 0,
				goals_against: 0,
				matches_won: 0,
				matches_lost: 0,
				matches: 0,
				matches_draw: 0
			}

			//si el equipo participó en el match
			if(match.home_team_id == team.id || match.visitor_team_id == team.id){
				//el team es home
				if(match.home_team_id == team.id){
					result.points = match.home_team_points
					result.goals_in_favor = match.home_team_goals
					result.goals_against = match.visitor_team_goals
				}
				//team es visitor
				else{
					result.points = match.visitor_team_points
					result.goals_in_favor = match.visitor_team_goals
					result.goals_against = match.home_team_goals
				}

				result.matches = 1

				const teamResult = getTeamResult(team, match)

				if(teamResult === 0){
					result.matches_draw = 1
				}
				else{
					result.matches_won = teamResult == 1 ? 1 : 0
					result.matches_lost = teamResult == -1 ? 1 : 0
				}
			}
			return result
		}

		//se extraen los matches donde ha participado el equipo y se normaliza en una estructura estandar
		const normalizeTeamResults = (matchesWithResults, matches) => {
			// logger.debug(matchesWithResults)
			return team => matchesWithResults.map(match => setTeamResults(team, match, matches))
		}

		const calculateStandingTable = results => {
			var tmp = results.reduce((total, result) => {
				// logger.debug(total)

				total.category_id = results[0].category_id
				total.phase_id = results[0].phase_id
				//debe tomarse el group_id del equipo, no del match.
				total.group_id = results[0].group_id
				total.team_id = result.team_id
				total.points += result.points
				total.goals_in_favor += result.goals_in_favor
				total.goals_against += result.goals_against
				total.matches_won += result.matches_won
				total.matches_lost += result.matches_lost
				total.matches += result.matches
				total.matches_draw += result.matches_draw
				total.data = result.data
				return total
			},{team_id: null, points: 0, goals_in_favor: 0, goals_against: 0, matches: 0, matches_won: 0, matches_lost: 0, matches_draw: 0})

			return tmp
		}

		//determina si el equipo fue el ganador del partido
		//  1 ganó el partido
		// -1 ganó el contrario
		//  0 empate
		const getTeamResult = (team, matchResult) => {
			let result = null
			if(matchResult.home_team_goals == matchResult.visitor_team_goals){
				result = 0
			}
			else{
				if(team.id == matchResult.home_team_id)
					result = matchResult.home_team_goals > matchResult.visitor_team_goals ? 1 : -1
				else
					result = matchResult.visitor_team_goals > matchResult.home_team_goals ? 1 : -1
			}
			return result
		}

		//==========================================================================
		//  Public functions. these are the ones exposed to the user
		//==========================================================================

		//given a set of matches (could be a entire category, or a group), returns the current standing table
		const calculateStandingTableByMatches = (matchSql, groupId) => {
			let matchesWithResults = null
			let matches = null
			let standingTable = null

			//TODO: el calculo de los score podria eliminarse una vez que el sistema este estable. Se recalcula para asegurar que los standings estan acordes a los eventos tipo gol.
			return Models.match.where({group_id: groupId, active: true})
			.fetchAll()
			//se actualizan los scores de los partidos en base a los eventos
			.then(matches => matches.map(m => m.updateScore()))
			//TODO: es posible que no sea necesario este query raw
			.then(() => Knex.raw(matchSql))
			.then(result => {
				//Se extraen los matches de la estructura y se almacenan en matches para uso posterior
				matches = result.rows
				//si la estructura no tiene matches, se retorna 404
				if(!matches || matches.length == 0)
					throw new Error('Matches not found')

				//separo los IDs de los matches
				var matchIds = matches.map(e => e.match_id).join(',')

				//query para obtener el # de goles de los matches
				//event type 1 = gol, event type 4 autogol
				var goalsByMatchSQL = `select match_id, event_id, team_id, count(*) as goals from events_matches_players where active = true and event_id in (1,4) and match_id in (${matchIds}) group by 1,2,3 order by 1,2,3`

				return Knex.raw(goalsByMatchSQL)
			})
			.then(result => {
				var goals = result.rows
				goals.map(g => g.goals = parseInt(g.goals))
				// console.log(matches);
				//estos son los matches con los puntos ya determinados
				matchesWithResults = matches
					.map(prepMatch)
					.map(assignGoalsToTeams(goals))
					.map(assignPointsByMatch)

				//extraigo los ID de teams
				var teams = matchesWithResults.map(m => [m.home_team_id, m.visitor_team_id])
				teams = _(teams).flatten().uniq().value()

				//se busca la info de cada team mencionado en la standing
				return Models.team
					.where({active: true})
					.where('id', 'in', teams)
					//de cada team, debo determinar el grupo que pertenezca a la misma fase que el grupo del match
					.fetchAll({withRelated: ['category_group_phase_team']})
			})
			.then(teams => {
				// const teams = result.models.map(m => m.attributes)
				//se sumarizan los resultados normalizados de los partidos
				// logger.debug(teams)
				// logger.debug('category_group_phase_team')
				// logger.debug(teams.map(t => t.related('category_group_phase_team').toJSON()))

				return teams
					.map(normalizeTeamResults(matchesWithResults, matches))
					.map(calculateStandingTable)
			})
			.then(result => {
				standingTable = result
				//se vacía la standing del grupo actual
				return Knex('standing_tables').where({group_id: groupId}).del()
			})
			.then(() => {
				return Promise.all(standingTable.map(row => {
					//TODO: cambiar por un bulk insert
					//se salva cada uno de los resultados calculados
					return new Models.standing_table({
						category_id: row.category_id,
						phase_id: row.phase_id,
						group_id: row.group_id,
						team_id: row.team_id,
						points: row.points,
						goals_in_favor: row.goals_in_favor,
						goals_against: row.goals_against,
						matches_count: row.matches,
						matches_won: row.matches_won,
						matches_lost: row.matches_lost,
						matches_draw: row.matches_draw
					})
					.save()
				}))
			})
			//actualizacion de tabla spider con las nuevas posiciones de los equipos
			//de acuerdo al calculo de la standing table.
			//Estas posiciones son utilizadas por el algoritmo de replaceMatchPlaceholders
			.then(() => Models.category_group_phase_team.updatePositionsInGroup(groupId))
			.catch(error => {
				throw error
			})
		}

		/*
		* Sumariza la standing table según un grupo
		*
		* la tabla standing almacena el 'grano' mas pequeño que permita calcular
		* los niveles superiores. En este caso, grupo > fase > categoria
		*/

		StandingTable.getStandingTableByCategory = (categoryId, res) => {
			Models.phase
			.where({category_id: categoryId})
			.fetchAll({withRelated: 'groups.standing_table.team'})
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) )
		}

		StandingTable.getSummarizedStandingTableByCategory = (categoryId, res) => {
			Models.standing_table
			.query((qb) => {
				qb.where({category_id: categoryId})
				.groupBy(['team_id', 'category_id'])
				.select(['team_id', 'category_id'])
				// .orderBy('points')
				.sum('points as points')
				.sum('goals_in_favor as goals_in_favor')
				.sum('goals_against as goals_against')
				.sum('matches_count as matches_count')
				.sum('matches_won as matches_won')
				.sum('matches_lost as matches_lost')
				.sum('matches_draw as matches_draw')
			})
			.fetchAll({withRelated:['team']})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error))
		}

		/*
		* Sumariza la standing table según un grupo
		*/
		StandingTable.getStandingTableByGroup = (groupId, res) => {
			Models.standing_table
			.query(qb => {
				qb.where({category_id: groupId})
				.groupBy(['team_id', 'category_id', 'phase_id', 'group_id'])
				.select(['team_id', 'category_id', 'phase_id', 'group_id'])
				.orderBy('points')
				.sum('points as points')
				.sum('goals_in_favor as goals_in_favor')
				.sum('goals_against as goals_against')
				.sum('matches_count as matches')
				.sum('matches_won as matches_won')
				.sum('matches_lost as matches_lost')
				.sum('matches_draw as matches_draw')
			})
			.fetchAll({withRelated:['team', 'group.phase']})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error))
		}

		StandingTable.calculateByGroup = (group_id) => {

			return new Promise((resolve, reject) => {
				try{
					//query que obtiene los matches del grupo dado
					var matchSql = 'select categories.id as category_id, phases.id as phase_id, groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches' +
					' inner join groups on groups.id = matches.group_id ' +
					' inner join phases on phases.id = groups.phase_id ' +
					' inner join categories on categories.id = phases.category_id ' +
					' where matches.played = true and groups.id = ' + group_id

					//TODO: el matchSQL podría moverse a esta función
					resolve(calculateStandingTableByMatches(matchSql, group_id))
				}
				catch(error){
					reject(error)
				}
			})
		}

		StandingTable.calculateByPhase = (phaseId) => {
			logger.debug('updating standing table of phase ' + phaseId)

			let matchIds = null
			let matches = null
			let teamStandings = null
			let teamSlots = null

			return new Promise((resolve, reject) => {
				// Dada la fase, obtengo los equipos participantes,
				// y los partidos en los que han jugado
				const query =
				' select categories_groups_phases_teams.phase_id'
				+ ' 	,categories_groups_phases_teams.group_id'
				+ ' 	,categories_groups_phases_teams.category_id'
				+ ' 	,categories_groups_phases_teams.team_id '
				+ ' 	,matches.id as match_id'
				+ ' from categories_groups_phases_teams'
				+ ' inner join groups on groups.id = categories_groups_phases_teams.group_id'
				+ ' inner join matches on (home_team_id = team_id or visitor_team_id = team_id)'
				+ ' where categories_groups_phases_teams.phase_id = ?'
				+ ' and categories_groups_phases_teams.group_id is not null'
				+ ' and matches.played = true'
				+ ' and matches.active = true'

				let data = null
				Models.phase.where({id: phaseId})
				.fetch({withRelated: [{'matches': function(qb){qb.where({played:true, 'matches.active': true})}}
				,'category_group_phase_team']})
				.then(phase => {
					const phaseSlots = phase.related('category_group_phase_team').toJSON()
					matchIds = phase.related('matches').map(x => x.id)
					// logger.debug(phaseSlots)

					return phase.related('matches').reduce((slots, match) => {
						let pos = phaseSlots.find(x => x.team_id == match.get('home_team_id'))

						slots[match.get('home_team_id')] = {
							team_id: match.get('home_team_id')
							,category_id: pos.category_id
							,phase_id: pos.phase_id
							,group_id: pos.group_id
						}

						//copy paste FTW
						let posV = phaseSlots.find(x => x.team_id == match.get('visitor_team_id'))
						slots[match.get('visitor_team_id')] = {
							team_id: match.get('visitor_team_id')
							,category_id: posV.category_id
							,phase_id: posV.phase_id
							,group_id: posV.group_id
						}
						return slots
					}, {})
				})
				.then(slots => {
					teamSlots = slots
					logger.debug(teamSlots)
					return Knex.raw(query, [phaseId])
				})
				.then(result => {
					//aqui se almacena el grupo x equipo
					// teamStandings = result.rows
					// 	.reduce((teams, row) => {
					// 		if(teams[row.team_id] == undefined){
					// 			teams[row.team_id] = {
					// 				team_id: row.team_id
					// 				,category_id: row.category_id
					// 				,phase_id: row.phase_id
					// 				,group_id: row.group_id
					// 			}
					// 		}
					// 		return teams
					// 	},{})
					//
					// logger.lme.i(teamStandings)
					// matchIds = _(result.rows.map(m => m.match_id)).uniq().value()
					// matches = null

					return Models.match.where('id', 'in', matchIds)
					.fetchAll()
				})
				//se actualizan los scores de los partidos en base a los eventos
				//TODO: pasar el updateScore al PUT de match
				.then(_matches => Promise.all(_matches.map(m => m.updateScore())))
				//salvajada para asegurar que tengo los scores correctos
				.then(() => Models.match
					.where('id', 'in', matchIds)
					.fetchAll({withRelated: 'events'}))
				.then(_matches => {
					matches = _matches
					//calculo de estadisticas
					return matches.reduce((standings, match) => {
						const homeId = match.get('home_team_id')
						const awayId = match.get('visitor_team_id')
						let home = standings[homeId]
						let away = standings[awayId]

						if(teamSlots[homeId] == undefined || !teamSlots[homeId].hasOwnProperty('category_id')){
							logger.lme.eline()
							logger.debug('esto se rompio')
							logger.debug(match.toJSON())
							logger.debug(homeId)
							logger.debug(teamSlots)
							logger.lme.eline()
						}

						if(home == undefined){
							home = {
							category_id: teamSlots[homeId].category_id
							,phase_id: teamSlots[homeId].phase_id
							,group_id: teamSlots[homeId].group_id
							,team_id: homeId
							,points: 0
							,goals_in_favor: 0
							,goals_against: 0
							,matches_count: 1
							,matches_won: 0
							,matches_lost: 0
							,matches_draw: 0}
						}
						else{
							home.matches_count += 1
						}

						if(away == undefined){
							away = {
							category_id: teamSlots[awayId].category_id
							,phase_id: teamSlots[awayId].phase_id
							,group_id: teamSlots[awayId].group_id
							,team_id: awayId
							,points: 0
							,goals_in_favor: 0
							,goals_against: 0
							,matches_count: 1
							,matches_won: 0
							,matches_lost: 0
							,matches_draw: 0}
						}
						else {
							away.matches_count += 1
						}

						//puntos, partidos ganados y perdidos
						if(match.get('home_team_score') == match.get('visitor_team_score')){
							home.points += 1
							away.points += 1
							home.matches_draw += 1
							away.matches_draw += 1
						}
						else{
							if(match.get('home_team_score') > match.get('visitor_team_score')){
								home.points += 3
								home.matches_won += 1
								away.points += 0
								away.matches_lost += 1
							}
							else{
								home.points += 0
								home.matches_lost += 1
								away.points += 3
								away.matches_won += 1
							}
						}

						//se cuentan goles
						const goalCount = match.related('events')
						//goles y autogoles
						.filter(e => e.get('event_id') == 1 || e.get('event_id') == 4)
						.reduce((goals, e) => {
							let count = goals[e.get('team_id')]
							if(goals[e.get('team_id')] == undefined)
								goals[e.get('team_id')] = {1: 0, 4: 0}

							goals[e.get('team_id')][e.get('event_id')] += 1
							return goals
						}, {})

						//a favor: mis goles y autogoles del adversario
						//en contra: goles en mi contra y mis autogoles
						//aqui se valida que hayan eventos del tipo, de no haber, se coloca 0
						home.goals_in_favor += (goalCount[homeId] && goalCount[homeId]['1']) ? goalCount[homeId]['1'] : 0
						home.goals_in_favor	+= (goalCount[awayId] && goalCount[awayId]['4']) ? goalCount[awayId]['4'] : 0
						home.goals_against 	+= (goalCount[homeId] && goalCount[homeId]['4']) ? goalCount[homeId]['4'] : 0
						home.goals_against 	+= (goalCount[awayId] && goalCount[awayId]['1']) ? goalCount[awayId]['1'] : 0
						away.goals_in_favor += (goalCount[awayId] && goalCount[awayId]['1']) ? goalCount[awayId]['1'] : 0
						away.goals_in_favor += (goalCount[homeId] && goalCount[homeId]['4']) ? goalCount[homeId]['4'] : 0
						away.goals_against 	+= (goalCount[awayId] && goalCount[awayId]['4']) ? goalCount[awayId]['4'] : 0
						away.goals_against 	+= (goalCount[homeId] && goalCount[homeId]['1']) ? goalCount[homeId]['1'] : 0

						standings[homeId] = home
						standings[awayId] = away
						return standings
					}, {})
				})
				.then(teamStandings => {
					const finalStanding = _(teamStandings).values().value()

					return Knex('standing_tables')
						.where({phase_id: phaseId})
						.del().then(() => finalStanding)
				})
				.then(standings => Promise.all(standings.map(row => Models.standing_table.forge(row).save())))
				.then(() => Models.phase.forge({id: phaseId}).fetch({withRelated: 'groups'}))
				.then(phase => Promise.all(phase.related('groups')
					.map(group => Models
					.category_group_phase_team
					.updatePositionsInGroup(group.id)))
				)
				.then(result => resolve(result))
				.catch(e => reject(e))
			})
		}

		return StandingTable
	}
)

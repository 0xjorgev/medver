if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../util/knex_util'
	,'../node_modules/lodash/lodash.min'
	,'../model/index'
	,'../util/response_message_util',
	'bluebird'],
	(Knex
	,_
	,Models
	,Response
	,bluebird) => {

	var StandingTable = {}

	//==========================================================================
	// private functions. Contains the inner logic for the calculations
	//==========================================================================

	//dados los eventos de un match, se asignan los goles del evento al match por cada equipo, home o visitor
	var assignGoalsToTeams = (events) => {
		return (match) => {

			// events.filter((event) => {
			// 	return event.match_id == match.match_id
			// })
			// .forEach((event) => {
			// 	console.log('event', event)
			// 	//goles
			// 	if(event.event_id == 1){
			// 		match.home_team_goals =
			// 			(event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
			// 		match.visitor_team_goals =
			// 			(event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
			// 	}
			// 	//autogoles
			// 	// else {
			// 	// 	match.home_team_goals =
			// 	// 		(event.team_id == match.home_team_id) ? event.goals : match.visitor_team_goals
			// 	// 	match.visitor_team_goals =
			// 	// 		(event.team_id == match.visitor_team_id) ? event.goals : match.home_team_goals
			// 	// }

			// })

			// Autogoals made by home team (this will be added to visitor teams goals)
			var home_team_autogoals = 0

			// Autogoals made by visitor team (this will be added to home teams goals)
			var visitor_team_autogoals = 0

			// The property "goals" in the object "event" actually is the count of the event
			events.forEach((event) => {
				console.log('\tevent', event)

				if(event.match_id == match.match_id){

					// Setting Goals
					if (event.event_id == 1) {
						match.home_team_goals = (event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
						match.visitor_team_goals = (event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
					}

					// Setting Autogoals
					if (event.event_id == 3) {
						home_team_autogoals = (event.team_id == match.home_team_id) ? event.goals : home_team_autogoals
						visitor_team_autogoals = (event.team_id == match.visitor_team_id) ? event.goals : visitor_team_autogoals
					}
				}
			})

			// Adding autogoals
			match.home_team_goals = match.home_team_goals + visitor_team_autogoals;
			match.visitor_team_goals = match.visitor_team_goals + home_team_autogoals;

			match.total_goals = match.home_team_goals + match.visitor_team_goals
			return match
		}
	}

	//dado un match, se le coloca dos propiedades para los scores de cada equipo
	var prepMatch = (match) => {
		match.home_team_goals = 0
		match.visitor_team_goals = 0
		match.total_goals = 0
		return match
	}

	//filtro que obtiene los eventos dado un match
	var filterByMatch = (match) => {
		return (event) => {
			return event.match_id == match.id
		}
	}

	//TODO: point value should be taken from db
	var assignPointsByMatch = (m) => {
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

	//sacar todos los ids de equipo, en home y visitor, then uniq
	var buildStandingTable = (table, match) => {
		table.find((team) => team.team_id == match.home_team_id )
	}

	var setTeamResults = (team, match) => {
		var result = {
		category_id: match.category_id,
		phase_id: match.phase_id,
		group_id: match.group_id,
		team_id: team.id,
		data: team, points: 0,
		goals_in_favor: 0,
		goals_against: 0,
		matches_won: 0,
		matches_lost: 0,
		matches: 0,
		matches_draw: 0}

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

			var teamResult = getTeamResult(team, match)

			if(teamResult === 0){
				result.matches_draw = 1
			}
			else{
				result.matches_won = teamResult == 1 ? 1 : 0
				result.matches_lost = teamResult == -1 ? 1 : 0
			}
		}

		// console.log('setTeamResults', result)

		return result
	}

	//se extraen los matches donde ha participado el equipo y se normaliza en una estructura estandar
	var normalizeTeamResults = (matchesWithResults) => {
		return (team) => {
			return matchesWithResults.map((match) => {
				return setTeamResults(team, match)
			})
		}
	}

	var calculateStandingTable = (results) => {

		// console.log('antes de calcular standing', results)

		var tmp = results.reduce((total, result) => {
			total.category_id = results[0].category_id
			total.phase_id = results[0].phase_id
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
	// 1 - ganó el partido
	// -1 ganó el contrario
	// 0 empate
	var getTeamResult = (team, matchResult) => {
		var result = null
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
	var calculateStandingTableByMatches = (matchSql, groupId) => {
		var matchesWithResults = undefined
		var matches = undefined
		var standingTable = null

		// se obtienen los matches que pertenecen a la categoria o grupo
		// la diferencia viene del query 'matchSql'; es ahi donde se diferencia si buscamos los matches de una cat o group
		Knex.raw(matchSql)
		.then(result => {
			//Se extraen los matches de la estructura y se almacenan en matches para uso posterior
			matches = result.rows
			//si la estructura no tiene matches, se retorna 404
			if(!matches || matches.length == 0)
				throw new Error("Matches not found")

			//separo los IDs de los matches
			var matchIds = matches.map((e) => e.match_id).join(',')

			//query para obtener el # de goles de los matches
			//event type 1 = gol, event type 4 autogol
			var goalsByMatchSQL = `select match_id, event_id, team_id, count(*) as goals from events_matches_players where active = true and event_id in (1,3) and match_id in (${matchIds}) group by 1,2,3 order by 1,2,3`

			return Knex.raw(goalsByMatchSQL)
		})
		.then(result => {
			var goals = result.rows
			goals.map((g) => g.goals = parseInt(g.goals))
			// console.log(matches);
			//estos son los matches con los puntos ya determinados
			matchesWithResults = matches
				.map(prepMatch)
				.map(assignGoalsToTeams(goals))
				.map(assignPointsByMatch)

			//extraigo los ID de teams
			var teams = matchesWithResults.map((m) => [m.home_team_id, m.visitor_team_id])
			teams = _(teams).flatten().uniq().value()

			//se busca la info de cada team mencionado en la standing
			return Models.team
				.where({active: true})
				.where('id', 'in', teams)
				.fetchAll({debug: false})
		})
		.then(result => {
			var teams = result.models.map((m) => m.attributes)
			//se sumarizan los resultados normalizados de los partidos
			standingTable = teams
				.map(normalizeTeamResults(matchesWithResults))
				.map(calculateStandingTable)
			return standingTable
		})
		.then(result => {
			//bloque para almacenar la standingTable en base de datos
			standingTable = result

			//se vacía la standing del grupo actual
			return Knex('standing_tables')
				.where({group_id: groupId})
				.del()
		})
		.then(result => {
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
		.then(result => {
			//se retornan los rows afectados
			var t = result.map(r => r.toJSON())
			return t
		})
		.catch(error => {
			throw error
		})
	}

	/*
	* Sumariza la standing table según un grupo
	*
	* la tabla standing almacena el 'grano' mas pequeño que permita calcular
	* los niveles superiores. En este caso, grupo > fase > categoria
\	*/

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
		.query((qb) => {
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

		console.log('>>>>>> StandingTable.calculateByGroup')

		return new Promise((resolve, reject) => {
			try{

				//query que obtiene los matches del grupo dado
				var matchSql = 'select categories.id as category_id, phases.id as phase_id, rounds.id as round_id, groups.id as group_id, matches.id as match_id, matches.home_team_id as home_team_id , matches.visitor_team_id as visitor_team_id from matches' +
				' inner join rounds on rounds.id = matches.round_id' +
				' inner join groups on groups.id = rounds.group_id ' +
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
		//
	}

	return StandingTable
});

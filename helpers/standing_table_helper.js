if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../util/knex_util',
	'../node_modules/lodash/lodash.min',
	'../model/index',
	'../util/request_message_util',
	'../util/response_message_util'
	],
	(Knex, _,
	Models,
	Message,
	Response) => {

	var StandingTable = {}

	//==========================================================================
	// private functions. Contains the inner logic for the calculations
	//==========================================================================

	//dados los eventos de un match, se asignan los goles del evento al match por cada equipo, home o visitor
	var assignGoalsToTeams = (events) => {
		return (match) => {
			events.forEach((event) => {
				if(event.match_id == match.match_id){
					match.home_team_goals = (event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
					match.visitor_team_goals = (event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
				}
			})

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
		var result = {team_id: team.id, data: team, points: 0,
		goals_in_favor: 0, goals_against: 0,
		matches_won: 0, matches_lost: 0,
		matches: 0, matches_draw: 0}

		//si el equipo participó en el match
		if(match.home_team_id == team.id || match.visitor_team_id == team.id){
			if(match.home_team_id == team.id){
				//el team es home
				result.points = match.home_team_points
				result.goals_in_favor = match.home_team_goals
				result.goals_against = match.visitor_team_goals
			}
			else{
				//team es visitor
				result.points = match.visitor_team_points
				result.goals_in_favor = match.visitor_team_goals
				result.goals_against = match.home_team_goals
			}

			result.matches = 1

			if(getTeamResult(team, match) === 0){
				result.matches_draw = 1
			}
			else{
				result.matches_won = getTeamResult(team, match) == 1 ? 1 : 0
				result.matches_lost = getTeamResult(team, match) == -1 ? 1 : 0
			}
		}

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
		return results.reduce((total, result) => {
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

	StandingTable.getStandingTableByMatches = (matchSql, res) => {
		var matchesWithResults = undefined
		var matches = undefined

		// se obtienen los matches que pertenecen a la categoria o grupo
		// la diferencia viene del query 'matchSql'; es ahi donde se diferencia si buscamos los matches de una cat o group
		Knex.raw(matchSql)
		.then((result) => {
			//Se extraen los matches de la estructura y se almacenan en matches para uso posterior
			matches = result.rows

			//si la estructura no tiene matches, se retorna 404
			if(!matches || matches.length == 0){
				Response(res, matches) // matches está vacio y causa un 404
				return
			}

			//separo los IDs de los matches
			var matchIds = matches.map((e) => e.match_id).join(',')

			//query para obtener el # de goles de los matches
			var goalsByMatchSQL = `select match_id, event_id, team_id, count(*) as goals from events_matches_players where active = true and event_id = 1 and match_id in (${matchIds}) group by 1,2,3 order by 1,2,3`

			return Knex.raw(goalsByMatchSQL)
		})
		.then((result) => {
			var goals = result.rows
			goals.map((g) => g.goals = parseInt(g.goals))

			//estos son los matches con los puntos ya determinados
			matchesWithResults = matches
				.map(prepMatch)
				.map(assignGoalsToTeams(goals))
				.map(assignPointsByMatch)

			//extraigo los ID de teams
			var teams = matchesWithResults.map((m) => [m.home_team_id, m.visitor_team_id])
			teams = _(teams).flatten().uniq().value()

			return Models.team
				.where({active: true})
				.where('id', 'in', teams)
				.fetchAll({withRelated: ['category_type', 'organization', 'player_team.player'], debug: false})
		})
		.then((result) => {
			teams = result.models.map((m) => m.attributes)
			//se sumarizan los resultados normalizados de los partidos
			var standingTable = teams
				.map(normalizeTeamResults(matchesWithResults))
				.map(calculateStandingTable)
			Response(res, standingTable)
		})
		.catch((error) => {
			Response(res, null, error)
		})
	}

	return StandingTable
});

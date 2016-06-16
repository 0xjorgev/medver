/*
select id, active, created_at, instant, player_in, player_out, match_id, event_id, team_id
from events_matches_players
group by team_id;

-- numero de goles por partido y por equipo (falta incluir el evento autogol)
select match_id, event_id, team_id, count(*)
from events_matches_players
where active = true
and event_id = 1
group by 1,2,3
order by 1,2,3;

select match_id, event_id, team_id, sum(goals) from(
select match_id, event_id, team_id, 1 as goals from events_matches_players
where active = true
and event_id = 1
and match_id = 2) as t
group by 1,2,3
order by 1,2,3;

-- reglas
select short_name, value from rules;
*/

var _ = require('lodash')

//matches en la categoría
var matches =
	[
	{id: 1, home_team_id: 1, visitor_team_id: 2},
	{id: 2, home_team_id: 3, visitor_team_id: 4},
	{id: 3, home_team_id: 1, visitor_team_id: 4},
	{id: 4, home_team_id: 2, visitor_team_id: 3},
	{id: 5, home_team_id: 1, visitor_team_id: 3},
	{id: 6, home_team_id: 2, visitor_team_id: 4}]

//goles asociados a los matchs de la categoría
var golesXmatchXequipo =
	[{match_id: 1, event_id: 1,team_id: 2, goals: 1 },
	{match_id: 2, event_id: 1,team_id: 3, goals: 1 },
	{match_id: 2, event_id: 1,team_id: 4, goals: 2 },
	{match_id: 3, event_id: 1,team_id: 1, goals: 1 },
	{match_id: 4, event_id: 1,team_id: 2, goals: 2 },
	{match_id: 5, event_id: 1,team_id: 1, goals: 2 },
	{match_id: 5, event_id: 1,team_id: 3, goals: 1 },
	{match_id: 6, event_id: 1,team_id: 2, goals: 1 },
	{match_id: 6, event_id: 1,team_id: 4, goals: 1 } ]

//reglas
rules = [{code:"PG", value:3}, {code:"PP", value:0}, {code:"PE", value:1}]

//dados los resultados de un match, se reducen a un objeto
var summarizeMatchResults = function(events){
	return function(match){
		events.forEach(function(event){
			if(event.match_id == match.id){
				match.home_team_goals = (event.team_id == match.home_team_id) ? event.goals : match.home_team_goals
				match.visitor_team_goals = (event.team_id == match.visitor_team_id) ? event.goals : match.visitor_team_goals
			}
		})
		return match
	}
}

//dado un match, se le coloca dos propiedades para los scores de cada equipo
var prepMatch = function(match){
	match.home_team_goals = 0
	match.visitor_team_goals = 0
	return match
}

//filtro que obtiene los eventos dado un match
var filterByMatch = function(match){
	return function(event){
		return event.match_id == match.id
	}
}

var assignPointsByMatch = function(m){

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
var buildStandingTable = function(table,match){

	table.find(function(team){
		return team.team_id == match.home_team_id
	})

}

/*
expected results [{
	team_id: 1,
	points: 9,
	goals: 3,
	matches: 3
},]
*/
var calculateStandingTable = function(table, result){

}

console.log('\n=======================================================\n')

// console.log('prepped matches', matches.map(prepMatch))

var finalResult = matches
	.map(prepMatch)
	.map(summarizeMatchResults(golesXmatchXequipo))
	.map(assignPointsByMatch)

//esto me retorna un resultado por match
console.log('finalResult:', finalResult)
console.log('\n=======================================================\n')


// var cosa = {}

// var innerObj = {key:0, values:[]}
// //var data = [innerObj]

// var match_ids = golesXmatchXequipo.map(function(element){
// 	return element.match_id
// })

// var keysUnique = _.unique(match_ids)

// var data = keysUnique.map(function(x){
// 	golesXmatchXequipo.filter(function(y){
// 		if (y.match_id == x){
// 			return y
// 		}
// 	})
// })

// console.log('match x id:', data)
// console.log('unique:', keysUnique)

// var match_ids = golesXmatchXequipo.map(function(element){
// 	cosa.key = element.match_id
// 	cosa.values = []

// 	// if(cosa.(element.match_id))

// 	cosa.value = { team_id: element.team_id, count: element.count }

// 	return cosa
// })

//console.log(match_ids)

// golesXmatchXequipo.filter(function(){
// })


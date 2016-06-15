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

-- reglas
select short_name, value from rules;
*/

var _ = require('lodash')

golesXmatchXequipo = [{match_id: 1,event_id: 1,team_id: 2, count: 1 },
{match_id: 2,event_id: 1,team_id: 3, count: 1 },
{match_id: 2,event_id: 1,team_id: 4, count: 2 },
{match_id: 3,event_id: 1,team_id: 1, count: 1 },
{match_id: 4,event_id: 1,team_id: 2, count: 2 },
{match_id: 5,event_id: 1,team_id: 1, count: 2 },
{match_id: 5,event_id: 1,team_id: 3, count: 1 },
{match_id: 6,event_id: 1,team_id: 2, count: 1 },
{match_id: 6,event_id: 1,team_id: 4, count: 1 }]

rules = [{code:"PG", value:3}, {code:"PP", value:0}, {code:"PE", value:1}]

var cosa = {}

var innerObj = {key:0, values:[]}
//var data = [innerObj]

var match_ids = golesXmatchXequipo.map(function(element){
	return element.match_id
})

var keysUnique = _.unique(match_ids)

var data = keysUnique.map(function(x){
	golesXmatchXequipo.filter(function(y){
		if (y.match_id == x){
			return y
		}
	})
})

console.log('match x id:', data)
console.log('unique:', keysUnique)

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

// golesXmatchXequipo.reduce(function(anterior, actual){
// },{})
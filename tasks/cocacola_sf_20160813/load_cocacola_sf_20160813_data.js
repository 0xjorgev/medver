var fs = require('fs')
var inspect = require('util').inspect
var _ = require('lodash')
var Knex = require('knex')
var Config = require('../../knexfile.js')
var Models = require('../../model/index.js')
var knex = new Knex(process.env.NODE_ENV ? Config[process.env.NODE_ENV] : Config['development']);

var _log = (obj) => console.log(inspect(obj, { colors: true, depth: Infinity }))

var getRandomNumber = (min, max) => {
	var tmp = Math.floor(Math.random() * (max - min + 1)) + min
	return tmp < 10 ? '0'+tmp : tmp
}

const teams = ["Epa United", "Fuego United", "Salinas FC", "Salinas Wildcats", "Selma Atletico RZ", "Tornados"]

//process file

var filenames = teams.map((t) =>  {
	return {
		team: t,
		filename: `${__dirname}/${t.toLowerCase().replace(/\s/g, '_')}.txt`
	}
})


//quick&dirty way to end this process
var teamsDone = []


console.log('----------------- cargando datos cocacola SF 20160813 -----------------')

filenames.forEach((file) => {

	fs.readFile(file.filename , (err, data) => {
		var players = _.chunk(data.toString().split('\n'), 5)
			.map((player) => {
				var bd = player[4].split('/')
				return {
					//datos de team
					team: file.team,
					//datos de player_team
					number: player[2],
					//datos de la tabla player
					first_name: player[1].trim(),
					last_name: player[0].trim(),
					birthday: new Date('20' + bd[2], bd[0] - 1, bd[1]),
					gender_id: player[3] == 'M' ? 1 : 2
				}
			}
		)

		var playerTeam = []

		knex.transaction((tr) => {

			var teamData = {
				name: file.team,
				short_name: 'T' + file.team.length
			}

			return knex('teams').insert(teamData, ['id', 'name']).transacting(tr)
		})
		.then((result, tr) => {
			// console.log('saved teams')
			var teamList = _.flatten(result)
			// _log(teamList)

			// save players
			return Promise.all(players.map( (player) => {

				var p = _.clone(player)
				delete p.number
				delete p.team

				return knex('players').insert(p, 'id').transacting(tr).then((result) => {

					// console.log(result)
					// console.log(player)

					thisTeam = teamList.filter((pt) => pt.name == player.team)
					// _log(result)
					playerTeam.push({
						team_id: thisTeam[0].id,
						player_id: result[0],
						number: player.number
					})
				})
			}))
		})
		.then( (result, tr) => {
			// console.log('saved players')
			//player_team
			return Promise.all(playerTeam.map( (t) => knex('players_teams').insert(t, ['id']).transacting(tr) ))
		})
		.then((result) => {
			// console.log('saved players_teams')
			// _log(result)

			console.log('done w/ team')
			teamsDone.push(true)

			if(teamsDone.length == teams.length){
				_log('end - done 👏')
				process.exit(0)
			}

		})
		.catch((error, tr) => {
			console.log(error.stack)
			process.exit(1)
		})
	}) // end read file
})















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

const teams = ['Alhambra United','Baldwin Park United', 'FC Premier', 'Norwalk FC', 'Strikers Olimpus FC', 'WCS Academy Madrid']

//process file
var filenames = teams.map((t) =>  {
	return {
		team: t,
		filename: `${__dirname}/${t.toLowerCase().replace(/\s/g, '_')}.txt`
	}
})

// _log(filenames.map( (f) => f.filename ))

//quick&dirty way to end this process
var teamsDone = []

console.log('----------------- cargando datos alianza LA 20160827 -----------------')

//builds a player given the csv
var getPlayer = (player) => {
	// 0 team
	// 1 name
	// 2 DoB
	// 3 Number
	var name = player[1].split(' ')
	var fn = name[0]

	var bd = player[2] && player[2] != '' ? player[2].split('/') : undefined
	bd = bd ? new Date('20' + bd[2], bd[0] - 1, bd[1]) : undefined

	return {
		team: player[0].trim(),
		number: player[3],
		first_name: name[0],
		last_name: name[1],
		birthday: bd,
		gender_id: 2
	}
}

filenames.forEach((file) => {

	fs.readFile(file.filename, (err, data) => {

		console.log('  processing', file.filename)

		if(err){
			_log(err)
			process.exit(1)
		}

		var players = data
			.toString()
			.trim()
			.split('\n')
			.map( (row) => row.split('\n'))
			.map( (row) => row[0].split(','))
			.map(getPlayer)

		var playerTeam = []

		var teamData = {
			name: file.team,
			short_name: 'T' + file.team.length,
			subdiscipline_id: 2, //soccer
			category_type_id: 10, //sub-15,
			gender_id: 2 //female
		}

		return knex('teams').insert(teamData, ['id', 'name'])
		.then((result) => {
			// console.log('  saved teams')
			var teamList = _.flatten(result)
			// _log(teamList)

			// save players
			return Promise.all(players.map( (player) => {
				var p = _.clone(player)
				delete p.number
				delete p.team

				return knex('players').insert(p, 'id')
				.then((result) => {
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
		.then( (result) => {
			// console.log('saved players')
			//player_team
			return Promise.all(playerTeam.map( (t) => knex('players_teams').insert(t, ['id']) ))
		})
		.then((result) => {
			// console.log('saved players_teams')
			// _log(result)
			// console.log('done w/ team')
			teamsDone.push(true)

			if(teamsDone.length == teams.length){
				_log('end - done 👽 ')
				process.exit(0)
			}
		})
		.catch((error) => {
			console.log(error.stack)
			process.exit(1)
		})
	}) // end read file
})















var xlsx = require('node-xlsx')
var inspect = require('util').inspect
var _ = require('lodash')
var Knex = require('knex')
var Config = require('../knexfile.js')
var Models = require('../model/index.js')
var knex = new Knex(Config.development);

var _log = (obj) => console.log(inspect(obj, { colors: true, depth: Infinity }))

//read file
const data = xlsx.parse(`${__dirname}/SabanaCompTestV1.xlsx`)

//process file

//list teams
var teams = data.map( (item) => {
	return {name: item.name}
} )
// _log(teams)

var parseExcelDate = (dateNumber) => new Date((new Date(1900,0,1)).getTime() + 86400000*(dateNumber - 2))

var playerInsert = []

//list players of each team
var result = data.forEach((sheet) => {

	sheet.data.forEach((player, index) => {
		if(index != 0 && player.length > 0){

			var p = {
				//datos de team
				team: sheet.name,
				//datos de player_team
				position: player[4],
				number: player[2],
				//datos de la tabla player
 				first_name: player[0].trim(),
 				last_name: player[1].trim(),
 				img_url: player[3] == 'M' ? 'https://s3.amazonaws.com/somosport-s3/male-players/Boy-01.png' : 'https://s3.amazonaws.com/somosport-s3/male-players/girl-01.png',
 				portrait_url: '',
 				nickname: player[6].trim(),
 				birthday: parseExcelDate(player[5]),
 				email: player[7].trim().toLowerCase(),
 				gender_id: player[3] == 'M' ? 1 : 2
			}

			playerInsert.push(p)
		}
	})
})

// _log(playerInsert)
// write to db
var teamList = undefined
var playerTeam = []
knex.transaction((tr) => {
	// save teams
	return Promise.all(teams.map( (t) => knex('teams').insert(t, ['id', 'name']).transacting(tr) ))
})
.then((result, tr) => {
	teamList = _.flatten(result)

	// save players
	return Promise.all(playerInsert.map( (player) => {

		//el player que sera salvado
		var p = _.clone(player)
		delete p.number
		delete p.position
		delete p.team

		return knex('players').insert(p, 'id').transacting(tr).then((result) => {
			thisTeam = teamList.filter((pt) => pt.name == player.team)

			_log(result)

			playerTeam.push({
				team_id: thisTeam[0].id,
				player_id: result[0],
				number: player.number,
				position: player.position
			})
		})
	}))
})
.then( (result, tr) => {
	//player_team
	return Promise.all(playerTeam.map( (t) => knex('players_teams').insert(t, ['id']).transacting(tr) ))
})
.then((result) => {
	// _log(result)
	console.log('all done!!')
})
.catch((error, tr) => {
	console.log(error)
})


//profit!
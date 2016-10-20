if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util', '../util/response_message_util'], function (express, Models, Message, Knex, Response) {

	var router = express.Router();

	//List of teams
	router.get('/', function (req, res) {

		return Models.team
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['category_type', 'organization', 'player_team.player', 'subdiscipline', 'gender'], debug:false})
		//.fetchAll({withRelated: ['gender', 'season']})
		.then(function (result) {
			console.log('result: ' + result);
			Message(res,'Success', '0', result);
		}).catch(function(error){
			console.log('Error: ' + error);
			Message(res,error.details, error.code, []);
		});
	});

	router.get('/:team_id/player', function (req, res) {

		var team_id = req.params.team_id;

		return Models.player_team
		.where({team_id:team_id})
		.where({active:true})
		.fetchAll({withRelated: ['player', 'position'], debug: false})
		.then(function (result) {
			// Message(res,'Success', '0', result);
			Response(res, result)
		}).catch(function(error){
			// Message(res,error.details, error.code, []);
			Response(res, null, error)
		});
	});

		//Team by Id -> Returns 1 result
	router.get('/:team_id', function (req, res) {

		var team_id = req.params.team_id;

		return Models.team
		.where({id:team_id, active:true})
		.fetch({withRelated: ['category_type', 'organization', 'player_team.player', 'subdiscipline', 'gender', 'player_team.position'], debug: false})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){
			Message(res,error.details, error.code, []);
		});

	});

	// //'category', 'organization'
	// router.get('/:org_id/organization/', function (req, res) {

	//     console.log('Rounds by group_id');

	//      var group_id = req.params.group_id;
	//     return Models.round
	//     .where({'group_id':group_id})
	//     .fetch({withRelated: ['group']})
	//     .then(function (result) {
	//         Message(res,'Success', '0', result);
	//     }).catch(function(error){
	//         Message(res,error.details, error.code, []);
	//     });
	// });


	//TODO: Esto parece no estar en uso, deberia arrojar error al probar
	router.post('/organization/:org_id/category/:cat_id', function (req, res) {

		console.log('Team: ', req.body);
		//Model Instance
		var Team        = Models.team;
		var team_post   = req.body;
		var org_id      = req.params.org_id;
		var cat_id      = req.params.cat_id;
		var logo_url    =  req.params.logo_url;
		var short_name  =  req.params.short_name;
		var description =  req.params.description;
		var subdiscipline_id =  req.params.subdiscipline_id;
		var gender_id 	=  req.params.gender_id;
		var name        = group_post.name;

		new Team(
			team_post
		// {
		//     name: name,
		//     organization_id: org_id,
		//     category_id: cat_id,
		//     logo_url: logo_url,
		//     short_name: short_name,
		//     description: description
		// }
		).save().then(function(new_team){
			console.log(`{new_team: ${new_team}}`);
			Message(res, 'Success', '0', new_team);
		}).catch(function(error){
			console.log(`{error: ${error}}`);
			Message(res, error.detail, error.code, null);
		});
	});

	//==========================================================================
	// CRUD functions
	//==========================================================================

	//TODO: move to helper
	var saveTeam = function(data, res){

		var orgData = {}
		data.name = data.name.trim()

		if(data.organization_id){
			orgData.id = data.organization_id
		}
		else{
			orgData = {
				//TODO: reemplazar el id por un code, en lugar del ID directo de base de datos
				organization_type_id: 3, //organizacion tipo club
				name: data.name + ' Club',
				description: data.description,
			}
		}

		var teamData = {
			name: data.name,
			logo_url: data.logo_url,
			category_type_id: data.category_type_id,
			organization_id: data.organization_id,
			subdiscipline_id: data.subdiscipline_id,
			gender_id: data.gender_id
		}

		if(data.id){
			teamData.id = data.id
		}
		teamData.short_name = data.short_name ? data.short_name : data.name.substr(0,2).toUpperCase()
		teamData.description = data.description ? data.description : data.name

		// spider is the 'category_group_phase_team' table
		// var spiderData = {
		// 	category_id: data.category_id,
		// 	phase_id: data.phase_id,
		// 	group_id: data.group_id,
		// }

		// if(data.category_group_phase_team_id){
		// 	spiderData.id = data.category_group_phase_team_id
		// }

		var _team = undefined

		//let's lookup the organization by id or by the previously-trimmed name
		Models.organization.query(function(qb){
			qb.where({id: teamData.organization_id})
			qb.orWhere({name: orgData.name})
		}).fetch()
		.then(function(found){
			//if found, let's put its id on teamData
			if(found){
				console.log('org found!', found.attributes)
				teamData.organization_id = found.attributes.id
				return teamData
			}
			else{
				//if not, let's create the organization
				console.log('org not found, creating')
				return new Models.organization(orgData).save().then(function(result){
					teamData.organization_id = result.attributes.id
					console.log('org created/updated', result.attributes)
					return teamData
				})
			}
		})
		.then(function(teamData){
			//with the organization stuff all sorted out, let's create the team
			console.log('before saving team', teamData)
			new Models.team(teamData).save()
			Message(res, 'Success', '0', teamData);
		})
		// .then(function(new_team){
		// 	//now let's associate the newly created team with the category
		// 	_team = new_team.attributes
		// 	console.log('team saved', _team)
		// 	spiderData.team_id = new_team.attributes.id
		// 	console.log('about to save in spider', spiderData)
		// 	return new Models.category_group_phase_team(spiderData).save()
		// })
		// .then(function(spiderData){
		// 	console.log('spider saved', spiderData.attributes)

		// 	//all ok, let's return the created team
		// 	var action = data.id ? 'updated' : 'created'
		// 	Message(res, `Team ${_team.id} ${action}`, '0', _team)
		// })
		.catch(function(error){
			// something has happened
			console.log('error', error)

			//TODO: no todo el tiempo se envia el detail... manejar el error en este tipo de casos
			Message(res, `${error.error} - detail: ${error.detail}`, error.code, error)
		})
	}

	router.post('/', function (req, res) {
		var data = req.body
		console.log('POST', data)
		saveTeam(data, res)
	});

	router.put('/:team_id', function(req, res, next){
		var data = req.body
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.team_id
		console.log('PUT', data)
		saveTeam(data, res)
	});

	var savePlayerTeam = (playerTeamData, res) => {

		console.log('Save Player Team: ', playerTeamData)
		var playerData = playerTeamData.player
		var teamData = playerTeamData.team_player

		//TODO: check player existance

		//version 1 -> insert into team roster without checking existance

		var _playerResult = undefined

		new Models.player(playerData).save().then((result) => {
			_playerResult = result
			//teamData.player_id = result.attributes.id
			var team_player = {
				number	: teamData.number,
				player_id : result.attributes.id,
				position_id : teamData.position_id,
				team_id : teamData.team_id
			}
			if(playerTeamData.team_player.id)
				team_player.id = playerTeamData.team_player.id
			
			console.log('team_player', team_player)

			return new Models.player_team(team_player).save()
		}).then((result) => {
			Message(res, 'Success', '0', {player: _playerResult, player_team: result})
		}).catch(function(error){
			console.log('error', error)
			console.log('error', error.stack)
			res.status(500);
			res.json({message: error.name, code: 500, data: error.detail});
		})
	}

	// Saves into players_teams, the roster of this team
	router.post('/:team_id/player', function(req, res){
		var data = req.body

		//TODO: validar que en el objeto de entrada no se estén enviando IDs de player y o de player team ... esto haría un update ne lugar de un create
		console.log('POST team - team_id', req.params, 'data', data )
		savePlayerTeam(data, res)
	})

	// updates players_teams, the roster of this team
	router.put('/:team_id/player/:player_id', function(req, res){
		var data = req.body
		data.id = req.params.team_id
		console.log('PUT team - team_id', req.params, 'data', data )
		savePlayerTeam(data, res)
	})

	//inactivates the player from the roster
	router.delete('/:team_id/player/:player_id', function(req, res){

		var PlayerTeam = new Models.player_team()
		var playerId = req.params.player_id
		var teamId = req.params.team_id

		console.log('DELETE team - team_id', req.params )

		var _found = undefined

		PlayerTeam.where({team_id: teamId, player_id: playerId}).fetch().then((result) => {
			console.log('player found', result.attributes)
			return new Models.player_team({id: result.attributes.id, active: false}).save()
		})
		.then((result) => {
			console.log('player updated', result.attributes)
			Message(res, 'Success', '0', result)
		})
		.catch(function(error){
			console.log('error', error);
			console.log('error', error.stack);
			Message(res, error.detail, error.code, error);
		})
	})

	return router;
});

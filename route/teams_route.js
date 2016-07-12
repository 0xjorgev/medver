if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

	var router = express.Router();

	//List of teams
	router.get('/', function (req, res) {

		console.log('Teams List');
		return Models.team
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['category_type', 'organization', 'player_team.player'], debug:true})
		//.fetchAll({withRelated: ['gender', 'season']})
		.then(function (result) {
			console.log('result: ' + result);
			Message(res,'Success', '0', result);
		}).catch(function(error){
			console.log('Error: ' + error);
			Message(res,error.details, error.code, []);
		});
	});

	//Team by Id -> Returns  [] result
	// router.get('/:team_id/player', function (req, res) {
	//
	// console.log('Team Players by team_id');
	//     var team_id = req.params.team_id;
	//
	//     return Models.player_team
	//     .where({team_id:team_id})
	//     .where({active:true})
	//     .fetchAll({withRelated: ['player'], debug: true})
	//     .then(function (result) {
	//         Message(res,'Success', '0', result);
	//     }).catch(function(error){
	//         Message(res,error.details, error.code, []);
	//     });
	//
	//     // return Models.team
	//     // .where({id:team_id})
	//     // .where({active:true})
	//     // .fetch({withRelated: ['category']})
	//     // .then(function (result) {
	//     //     Message(res,'Success', '0', result);
	//     // }).catch(function(error){
	//     //     Message(res,error.details, error.code, []);
	//     // });
	// });

	router.get('/:team_id/player', function (req, res) {
		console.log('Team Players by team_id');
		var team_id = req.params.team_id;

		return Models.player_team
		.where({team_id:team_id})
		.where({active:true})
		.fetchAll({withRelated: ['player'], debug: true})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){
			Message(res,error.details, error.code, []);
		});
	});

		//Team by Id -> Returns 1 result
	router.get('/:team_id', function (req, res) {

		console.log('Team by id');

		var team_id = req.params.team_id;

		return Models.team
		.where({id:team_id})
		.where({active:true})
		//.fetchAll({withRelated: ['category_type'], debug: true})
		.fetch({withRelated: ['category_type', 'organization', 'player_team.player'], debug: true})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){
			Message(res,error.details, error.code, []);
		});

		// return Models.team
		// .where({id:team_id})
		// .where({active:true})
		// .fetch({withRelated: ['category']})
		// .then(function (result) {
		//     Message(res,'Success', '0', result);
		// }).catch(function(error){
		//     Message(res,error.details, error.code, []);
		// });
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

		console.log('Team Create');
		//Model Instance
		var Team        = Models.team;
		var team_post   = req.body;
		var org_id      = req.params.org_id;
		var cat_id      = req.params.cat_id;
		var logo_url    =  req.params.logo_url;
		var short_name  =  req.params.short_name;
		var description =  req.params.description;
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
			organization_id: data.organization_id
		}

		if(data.id){
			teamData.id = data.id
		}
		teamData.short_name = data.short_name ? data.short_name : data.name.substr(0,2).toUpperCase()
		teamData.description = data.description ? data.description : data.name

		var spiderData = {
			category_id: data.category_id,
			phase_id: data.phase_id,
			group_id: data.group_id,
		}

		var _team = undefined

		//let's lookup the organization by id or by the previously-trimmed name
		Models.organization.query(function(qb){
			qb.where({id: teamData.organization_id})
			qb.orWhere({name: orgData.name})
		}).fetch()
		.then(function(found){
			//if found, let's put its id on teamData
			if(found){
				console.log('org found!', found)
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
			console.log('before saving team', teamData.attributes)
			return new Models.team(teamData).save()
		})
		.then(function(new_team){
			//now let's associate the newly created team with the category
			_team = new_team.attributes
			console.log('team saved', _team)
			spiderData.team_id = new_team.attributes.id
			return new Models.category_group_phase_team(spiderData).save()
		})
		.then(function(spiderData){
			//all ok, let's return the created team
			console.log(spiderData)
			Message(res, 'Success', '0', _team)
		})
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

	return router;
});

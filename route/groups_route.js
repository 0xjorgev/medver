if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express',
		'../model/index',
		'../util/request_message_util',
		'../util/response_message_util',
		'../util/knex_util',
		'../helpers/standing_table_helper'],
		 (express,
			Models,
			Message,
			Response,
			Knex,
			StandingTable) => {

	var router = express.Router();

	router.get('/', function (req, res) {
		return Models.group
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['rounds']})
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.get('/:group_id', function (req, res) {
		var group_id = req.params.group_id;

		return Models.group
		.where({id:group_id, active:true})
		.fetch({withRelated: ['rounds']})
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.get('/:group_id', function (req, res) {
		var group_id = req.params.group_id;
		return Models.round
		.where({'group_id':group_id})
		.fetch({withRelated: ['group']})
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	router.post('/', function (req, res) {
		//Model Instance
		var Group = Models.group;
		var group_post = req.body;
		var phase_id = group_post.phase_id;

		console.log('Request body', group_post);

		new Group(group_post)
		.save()
		.then(function(new_group){
			var data = req.body
			updateFase(data, res, new_group)
		}).catch(function(error){
			Response(res, null, error)
		});
	});

	router.put('/:group_id', function(req, res, next){
		//Model Instance
		var group = new Models.group;
		//URL Request, Season Id
		var group_id = req.params.group_id;
		var group_upd = req.body;

		Knex(group.tableName)
		.where('id','=',group_id)
		.where('active','=',1)
		.update(group_upd, ['id'])
		.then(function(result){
			if (result.length != 0){
				console.log('result: ',result[0]);
				var data = req.body
				updateFase(data, res, result)
			} else {
				Message(res, 'group not found', '404', result);
			}
		})
		.catch(function(err){
			Response(res, null, error)
		});
	});

	router.get('/:group_id/standing_table', function(req, res){
		var group_id = req.params.group_id;
		StandingTable.getStandingTableByGroup(group_id, res)
	})

	router.get('/:group_id/team', function(req, res){
		var group_id = req.params.group_id;

		return Models.category_group_phase_team
			.where({group_id:group_id, active: true})
			.fetchAll({withRelated:['team','category','group','phase']})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				Response(res, null, error)
			});
	})

	router.post('/:group_id/standing_table', function(req, res){
		var group_id = req.params.group_id
		StandingTable.calculateByGroup(group_id)
		StandingTable.getStandingTableByGroup(group_id, res)
	})

	//FUNCION PARA ACTUALIZAR LOS VALORES DE LA TABLA FASE CUANDO SE CAMBIEN LOS VALORES DE UN GRUPO
	var updateFase = (data, res, group_result) => {
		console.log("data: ", data)
		var phase_id = data.phase_id
		console.log("phase_id: ", phase_id)

		//Obtenemos todos los grupos de esa fase
		Models.group
		.where({phase_id:phase_id, active:true})
		.fetchAll()
		.then( (result) => {
			var participant_teams = result.models.map((m) => m.attributes.participant_team)
			var classified_teams = result.models.map((m) => m.attributes.classified_team)
			console.log("participant_teams ", participant_teams)
			console.log("classified_teams ", classified_teams)
			var participant_team = participant_teams.reduce(function(pt, n) {
									return pt + n; })

			console.log("Phase participant_team ", participant_team)
			var classified_team = classified_teams.reduce(function(ct, n) {
									return ct + n; })
			console.log("Phase classified_team ", classified_team)
			console.log("phase_id: ", phase_id)

			//Se guarda los campos en la fase
			var phase_upd = {
				id			  : phase_id,
				participant_team: participant_team,
				classified_team : classified_team
			};

			var Phase = Models.phase;
			Knex('phases')
			.where('id','=', phase_id)
			.update(phase_upd, ['id'])
			.then((phases_result) => {
				if (result.length != 0){
					Response(res, group_result)
				} else {
					Response(res, [])
				}
			})
			.catch((err) => {
				Response(res, null, err)
			})
		})
		.catch((error) => {
			Response(res, null, error)
		})
	}

	return router;
});

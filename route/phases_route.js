if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express',
	'../model/index',
	'../util/response_message_util',
	'../util/knex_util',
	'../helpers/app_helper.js'
	,'../util/logger_util'],
	(express,
		Models,
		Response,
		Knex,
		Util
		,logger
	) => {

	let router = express.Router();

	function teamMap(team){
		return team.relations;
	}

	function groupMap(group){
		var innerObject = group.relations.category_group_phase_team.models;
		var delta_group = group;
		delta_group.relations = null;
		return { group:delta_group, teams:innerObject.map(innerMap)  };
	}

	function innerMap(inner){
		return inner.relations.team;
	}

	//Teams by Phase
	router.get('/:phase_id/team', function (req, res) {
		var phase_id = req.params.phase_id;

		return Models.category_group_phase_team
		.where({phase_id:phase_id,active:true})
		.fetchAll({withRelated:['team']})
		.then(function (result) {
			Response(res, result.models.map(teamMap))
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	//Groups & teams by Phase
	router.get('/:phase_id/group_team', function (req, res) {
		var phase_id = req.params.phase_id;

		return Models.group
		.query(function(qb){})
		.where({'phase_id':phase_id, active:true})
		.fetchAll({withRelated: ['category_group_phase_team.team']})
		.then(function(result) {
			Response(res, result.models.map(groupMap))
		}).catch(function(error){
			Response(res, null, error)
		});
	});

	router.get('/:phase_id/match', (req, res) => {
		var phase_id = req.params.phase_id;
		return Models.group
		.where({'phase_id': phase_id, active: true})
		.fetchAll({withRelated: ['matches.home_team', 'matches.visitor_team','matches.referee.user']})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	router.get('/', function (req, res) {
		return Models.phase
		.query(function(qb){
			// qb.limit(25);
		})
		.where({active:true})
		.fetchAll({withRelated: ['category' , { groups: function(qb) { qb.where('active', true) }}], debug: false})
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	//Phase by phase_id
	router.get('/:phase_id', function (req, res) {
		var phase_id = req.params.phase_id;
		return Models.phase
		.where({'id':phase_id, active:true})
		.fetch({withRelated: ['groups']})
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	const buildData = (input) => {
		let data = {}

		if(input.id != undefined) data.id = input.id
		if(input.category_id != undefined) data.category_id = input.category_id
		if(input.name != undefined) data.name = input.name
		if(input.position != undefined) data.position = input.position
		if(input.classified_team != undefined) data.classified_team = input.classified_team
		if(input.active != undefined) data.active = input.active

		return data
	}

	router.post('/', function (req, res) {
		logger.debug(req.body)

		const data = buildData(req.body)

		Models.phase.forge(data)
		.save()
		.then(new_phase => {
			Response(res, new_phase)
		})
		.catch(error => {
			Response(res, null, error)
		})
	})

	router.put('/:phase_id', function (req, res) {
		// logger.debug(req.body)
		let preData = Object.create(req.body,{})
		preData.id = req.params.phase_id

		const data = buildData(preData)

		logger.debug(data)

		Knex('phases')
		.where('id','=',preData.id)
		.update(data, ['id'])
		.then(result => {
			Response(res, result)
		})
		.catch(err => {
			Response(res, null, err)
		})
	})

	return router

});

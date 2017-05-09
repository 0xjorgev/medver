if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express',
		'../model/index',
		'../util/response_message_util',
		'../util/knex_util',
		'../util/logger_util',
		'../helpers/standing_table_helper'],
		 (express,
			Models,
			Response,
			Knex,
			logger,
			StandingTable) => {

	let router = express.Router()

	router.get('/', function (req, res) {
		return Models.group
		.where({active:true})
		.fetchAll({withRelated: ['rounds']})
		.then(result => {
			Response(res, result)
		})
		.catch(error =>{
			Response(res, null, error)
		})
	})

	router.get('/:group_id', (req, res) => {
		var group_id = req.params.group_id;
		return Models.group
		.where({id: group_id, active:true})
		.fetch({withRelated: ['rounds']})
		.then( result => Response(res, result) )
		.catch( error => Response(res, null, error) )
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

	router.post('/', (req, res) => {
		const groupPost = buildGroupData(req.body)

		Models.group.forge(groupPost)
		.save()
		.then(newGroup => {
			return updatePhase(groupPost)
		})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error) )
	})

	router.put('/:group_id', function(req, res, next){
		//URL Request, Season Id
		const groupId = req.params.group_id;
		const groupUpd = buildGroupData(req.body)
		let updateResult = null

		Knex('groups')
		.where({ id: groupId, active: true })
		.update(groupUpd, ['id'])
		.then(result => {
			updateResult = result
			return updatePhase(groupUpd)
		})
		.then(result => Response(res, updateResult) )
		.catch(error => Response(res, null, error) )
	});

	router.get('/:group_id/standing_table', function(req, res){
		const group_id = req.params.group_id;
		StandingTable.getStandingTableByGroup(group_id, res)
	})

	router.get('/:group_id/team', (req, res) => {
		const group_id = req.params.group_id

		return Models.category_group_phase_team
			.where({group_id: group_id, active: true})
			.fetchAll({withRelated:['team','category','group','phase']})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error));
	})

	router.get('/:group_id/match', (req, res) => {
		const group_id = req.params.group_id;
		return Models.match
			.query(qb => {
				qb.where({group_id: group_id, active: true})
			})
			.fetchAll({withRelated: [
				'events.event'
				,'events.player_in'
				,'events.player_out'
				,'home_team.match_player_team'
				,'visitor_team.match_player_team'
				,'home_team.summoned.player.gender'
				,'home_team.summoned.player.player_team.position'
				,'visitor_team.summoned.player.gender'
				,'visitor_team.summoned.player.player_team.position'
			]})
			.then( result => Response(res, result) )
			.catch( error => Response(res, null, error) );
	})

	router.post('/:group_id/match', (req, res) => {
		Models.group
		.forge({id: req.params.group_id})
		.fetch()
		.then(group => (group == null) ? null : group.createMatches() )
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	router.post('/:group_id/standing_table', function(req, res){
		var group_id = req.params.group_id
		StandingTable.calculateByGroup(group_id)
		StandingTable.getStandingTableByGroup(group_id, res)
	})

	const buildGroupData = data => {
		let obj = {}
		if(data.id != undefined) obj.id = data.id
		if(data.name != undefined) obj.name = data.name
		if(data.phase_id != undefined) obj.phase_id = data.phase_id
		if(data.classified_team != undefined) obj.classified_team = data.classified_team
		if(data.participant_team != undefined) obj.participant_team = data.participant_team
		if(data.active != undefined) obj.active = data.active
		logger.debug(data)
		return obj
	}

	//la phase y los grupos comparten los campos classified_team y participant teams
	//Esta funcion actualiza los campos classified_team y participant teams cuando se salva un
	//grupo; de este modo, la tabla phases siempre está en sincronía con sus grupos
	const updatePhase = data => {
		const phaseId = data.phase_id

		if(phaseId === null || phaseId === undefined){
			return null
		}

		//Obtenemos todos los grupos de esa fase
		return Models.group
		.where({phase_id: phaseId, active: true})
		.fetchAll()
		.then(result => {
			//se totaliza el numero de equipos participantes y el num. de equipos
			//que pasan a la siguiente fase
			const phaseUpd = result.reduce( (obj, group) => {
				obj.participant_team += group.attributes.participant_team
				obj.classified_team += group.attributes.classified_team
				return obj
			}, { id: phaseId, participant_team: 0, classified_team: 0 })

			return Knex('phases')
			.where({id: phaseId})
			.update(phaseUpd, ['id'])
		})
		.then(updateResult => {
			return updateResult
		})
		.catch(error => {
			return error
		})
	}

	return router
})

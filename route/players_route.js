if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
	, '../model/index'
	, '../util/request_message_util'
	, '../util/knex_util'
	,'../util/generic_util'
	,'../util/logger_util'
	,'../util/response_message_util']
	, function (express
		, Models
		, Message
		, Knex
		, utilities
		, logger
		, Response
		) {


	var router = express.Router();

	router.get('/', (req, res) => {
		return Models.player
		.fetchAll({withRelated: ['team.organization', 'person' ,'person.gender', 'position'], debug: false})
		.then( (result) => {
			Message(res,'Success', '0', result);
		})
	})

	//List of Events
	//Event by Subdiscipline_id -> Returns array
	//
	router.get('/:player_id', function (req, res) {

		console.log('Player Profile');
		var player_id = req.params.player_id;

		return Models.player
		.where({id:player_id})
		.where({active:true})
		.fetchAll({withRelated: ['team.organization', 'person' ,'person.gender', 'position'], debug: false})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){
			Message(res,error.details, error.code, []);
		});
	});

	router.get('/:player_id/category/:category_id/events', function (req, res) {

		console.log('Player Profile');
		var playerId = req.params.player_id;
		var categoryId = req.params.category_id;

		//FIXME: hay que eliminar la referencia a round
		return Models.event_match_player.query(function(qb){
				qb.innerJoin('matches', 'matches.id', 'events_matches_players.match_id')
				qb.innerJoin('rounds', 'rounds.id', 'matches.round_id')
				qb.innerJoin('groups', 'groups.id', 'rounds.group_id')
				qb.innerJoin('phases', 'phases.id', 'groups.phase_id')
				qb.innerJoin('categories', 'categories.id', 'phases.category_id')
				qb.where('categories.id', '=', categoryId)
				qb.where('matches.active', '=', true)
				qb.where('player_in', '=', playerId)
				qb.orWhere('player_out', '=', playerId)
			})
		.fetchAll({withRelated: ['player_in', 'player_out', 'match_id.home_team','match_id.visitor_team', 'event_id', 'team']})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){

			console.log(error)

			Message(res, error, error.code, []);
		});
	});

	router.post('/', (req, res) => {
		
		const _players = utilities.isArray(req.body.data) ? req.body.data : [req.body.data]
		return Promise.all(_players.map(_pl => {
			// logger.debug(_pl)
			return Models.person.findOrCreate(_pl.person)
			.then(result => {
				let newPerson = result.toJSON()
				// logger.debug(newPerson)
				_pl.person_id = newPerson.id
				let player = {}
				if(_pl.number !== undefined && _pl.number !== null) player.number = _pl.number
				if(_pl.person_id !== undefined && _pl.person_id !== null) player.person_id = _pl.person_id
				if(_pl.team_id !== undefined  && _pl.team_id !== null) player.team_id = _pl.team_id
				if(_pl.position_id !== undefined && _pl.position_id !== null ) player.position_id = _pl.position_id
				if(_pl.active !== undefined && _pl.active !== null ) player.active = _pl.active
				if(_pl.img_url !== undefined && _pl.img_url !== null ) player.img_url = _pl.img_url
				if(_pl.id !== undefined && _pl.id !== null ) player.id = _pl.id
				return Models.player.findOrCreate(player)
			})
			.then(_newpl => {
				let newPlayer = _newpl.toJSON()
				logger.debug(newPlayer)
				return _newpl
			})
		}))
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	router.put('/:player_id', (req, res)  => {
		let playerId = req.params.player_id;
		const _players = utilities.isArray(req.body.data) ? req.body.data : [req.body.data]
		return Promise.all(_players.map(_pl => {
			//Creamos el objeto de player
			let player = {}
			//Creamos el player
			if(_pl.number !== undefined ) player.number = _pl.number
			if(_pl.person_id !== undefined) player.person_id = _pl.person_id
			if(_pl.team_id !== undefined ) player.team_id = _pl.team_id
			if(_pl.position_id !== undefined ) player.position_id = _pl.position_id
			if(_pl.active !== undefined ) player.active = _pl.active
			if(_pl.img_url !== undefined ) player.img_url = _pl.img_url
			player.id = playerId

			return Models.player.savePlayer(player)
			.then(result => {
				player = result.toJSON()
				if(_pl.person !== undefined)
					return Models.person.updatePerson(_pl.person)
				else
					return result
			})
			.then(_newpl => {
				let newPlayer = _newpl.toJSON()
				//Retorno el player que se acaba de hacer update
				return Models.player
					.where({id:player.id})
					.where({active:true})
					.fetch({withRelated: ['team.organization', 'person' ,'person.gender', 'position'], debug: false})
				})
			}))
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	const createPlayer = (_pl) => {
		return Models.person.findOrCreate(_pl.person)
		.then(result => {
			let newPerson = result.toJSON()
			_pl.player.person_id = newPerson.id
			let newPlayer = (Models.player.findOrCreate(_pl.player)).toJSON()

			logger.debug(15)
			logger.debug(newPlayer)
			return newPlayer
		})
	}

	return router;
});

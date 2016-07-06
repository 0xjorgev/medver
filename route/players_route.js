if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

	var router = express.Router();

	//List of Events
	//Event by Subdiscipline_id -> Returns array
	//
	router.get('/:player_id', function (req, res) {

		console.log('Player Profile');
		var player_id = req.params.player_id;

		return Models.player
		.where({id:player_id})
		.where({active:true})
		.fetchAll({withRelated: ['player_team.team.organization', 'gender'], debug: true})
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
		.fetchAll({withRelated: ['player_in', 'player_out', 'match_id', 'event_id', 'team']})
		.then(function (result) {
			Message(res,'Success', '0', result);
		}).catch(function(error){

			console.log(error)

			Message(res, error, error.code, []);
		});
	});

	return router;
});

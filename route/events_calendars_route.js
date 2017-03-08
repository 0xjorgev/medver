if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
	,'../model/index'
	,'../util/response_message_util'
	,'../util/knex_util',]
	,function (express, Models, Response, Knex) {

	var router = express.Router();

	router.get('/', function (req, res) {
		return Models.event_calendar
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: []})
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	});

	router.get('/:event_calendar_id', function (req, res) {
		var event_calendar_id = req.params.event_calendar_id;
		return Models.event_calendar
		.where({id:event_calendar_id})
		.fetch({withRelated: []})
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	});

	return router;
});
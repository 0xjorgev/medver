if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
	,'../model/index'
	,'../util/response_message_util']
	, function (express, Models, Response) {

	let router = express.Router();

	router.get('/', function (req, res) {
		return Models.gender
		.query(function(qb){})
		.fetchAll()
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res,null,error)
		});
	});

	router.get('/:gender_id', function (req, res) {
		var gender_id = req.params.gender_id;
		// tapping into Knex query builder to modify query being run
		return Models.gender
		.where({'id':gender_id})
		.fetch()
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res,null,error)
		});
	});

	return router;
});

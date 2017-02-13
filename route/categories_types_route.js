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
		return Models.category_type
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

	router.get('/:category_type_id', function (req, res) {
		var category_type_id = req.params.category_type_id;
		return Models.category_type
		.where({id:category_type_id, active: true})
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

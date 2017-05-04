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
		return Models.person
		.query(function(qb){})
		.where({active:true})
		.fetchAll({withRelated: ['gender']})
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	});

	router.get('/:person_id', function (req, res) {
		var person_id = req.params.person_id;
		return Models.person
		.where({id:person_id})
		.fetch({withRelated: ['gender']})
		.then(function (result) {
			Response(res, result);
		})
		.catch(function(error){
			Response(res, null, error);
		});
	});

	//creacion de una persona
	router.post('/', (req, res) => {
		var data = req.body
		data._currentUser = req._currentUser
		return Models.person.findOrCreate(data)
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});

	//actualizacion de una persona
	router.put('/:person_id', function(req, res, next){
		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.person_id
		return Models.person.updatePerson(data)
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});


	return router;
});
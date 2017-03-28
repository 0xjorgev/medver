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

	var save = function(data, res){
		console.log('Save calendar event', data)
		return Models.person.savePerson(data)
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	}

	//creacion de club
	router.post('/', (req, res) => {
		//Verificacion de permisos
        // var chk = auth.checkPermissions(req._currentUser, [])
        // if(chk.code !== 0){
        //     Response(res, null, chk)
        //     return
        // }

		var data = req.body
		data._currentUser = req._currentUser
		save(data, res)
	});

	//actualizacion de club
	router.put('/:person_id', function(req, res, next){
		//Verificacion de permisos
        // var chk = auth.checkPermissions(req._currentUser, [])
        // if(chk.code !== 0){
        //     Response(res, null, chk)
        //     return
        // }

		var data = req.body
		data._currentUser = req._currentUser
		//setting the ID on the object to be saved is the way to signal bookshelf to create or update
		data.id = req.params.person_id
		save(data, res)
	});

	//actualizacion de club
	router.delete('/:person_id', function(req, res, next){
		//Verificacion de permisos
        // var chk = auth.checkPermissions(req._currentUser, [])
        // if(chk.code !== 0){
        //     Response(res, null, chk)
        //     return
        // }
		return Models.person.deleteEventCalendar(req.params.person_id)
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	});
	

	return router;
});
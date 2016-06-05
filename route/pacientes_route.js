/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express',
    '../model/index',
    '../util/knex_util',
    '../util/request_message_util'],
    function (express, Models, Knex_util, Message) {

    	var router = express.Router();

    	//List of seasons (don't seem to be needed) -> Returns Array of result
	    router.get('/', function (req, res) {
	        return Models.paciente
	        .query(function(qb){})
	        .fetchAll()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    router.get('/:id', function (req, res) {
	    	var paciente_id = req.params.id;

	        return Models.paciente
	        .where({id:paciente_id})
	        .fetch()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	   	router.get('/:id/historia', function (req, res) {
	    	var paciente_id = req.params.id;
	    	console.log('user id: ', paciente_id);
	        return Models.paciente
	        .where({id:paciente_id})
	        .fetch({withRelated: ['historia']})
	        .then(function (result) {
	        	console.log('Result: ', result);
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	        	console.log('error: ', error);
	            Message(res,error.details, error.code, []);
	        });
	    });

		return router;
	});
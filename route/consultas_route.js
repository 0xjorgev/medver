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
    function (express, Models, Knex, Message) {

    	var router = express.Router();

    	//List of seasons (don't seem to be needed) -> Returns Array of result
	    router.get('/', function (req, res) {
	        return Models.consulta
	        .query(function(qb){})
	        .fetchAll()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    router.get('/:id', function (req, res) {
	    	var consulta_id = req.params.id;

	        return Models.consulta
	        .where({id:consulta_id})
	        .fetch()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    //Create new Paciente
	   	router.post('/', function (req, res) {
			// console.log('Creacion de consulta Medica');
			var Consulta = Models.consulta;
			var cons = {}

        	if (req.body.antecedente != undefined) cons.antecedente = req.body.antecedente
        	if (req.body.fecha != undefined) cons.fecha = req.body.fecha
        	if (req.body.tratamiento != undefined) cons.tratamiento = req.body.tratamiento
        	if (req.body.historia_id != undefined) cons.historia_id = req.body.historia_id
        	if (req.body.tipo_consulta_id != undefined) cons.tipo_consulta_id = parseInt(req.body.tipo_consulta_id)

        	// console.log('Cons', cons);
			new Consulta(cons)
			.save()
			.then(function(new_consulta){
				// console.log(`{new Cons: ${new_consulta}}`);
            	Message(res, 'Success', '0', new_consulta);
			})
			.catch(function(error){
            	console.log(`{error: ${error}}`);
            	Message(res, error.detail, error.code, null);
        	});
	    });


	    router.put('/:consulta_id', function(req, res, next){
        	// console.log('Consulta PUT')
        	var cons = {}

        	if (req.body.id != undefined) cons.id = req.body.id
        	if (req.body.antecedente != undefined) cons.antecedente = req.body.antecedente
        	if (req.body.fecha != undefined) cons.fecha = req.body.fecha
        	if (req.body.tratamiento != undefined) cons.tratamiento = req.body.tratamiento
        	if (req.body.historia_id != undefined) cons.historia_id = req.body.historia_id
        	if (req.body.tipo_consulta_id != undefined) cons.tipo_consulta_id = parseInt(req.body.tipo_consulta_id)

        	// console.log('Cons', cons);

	        new Models.consulta(cons)
			.save()
			.then(function(update_consulta){
				// console.log(`{update Cons: ${update_consulta}}`);
            	Message(res, 'Success', '0', update_consulta);
			})
			.catch(function(error){
            	console.log(`{error: ${error}}`);
            	Message(res, error.detail, error.code, null);
        	});
    	});


		return router;
	});
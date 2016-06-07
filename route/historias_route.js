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
	        return Models.historia
	        .query(function(qb){})
	        .fetchAll()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    router.get('/:historia_id', function (req, res) {
	    	var historia_id = req.params.id;

	        return Models.historia
	        .where({id:historia_id})
	        .fetch()
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    //Create Medical History Record
	   	router.post('/', function (req, res) {
			console.log('Creacion de Historia Medica');
			var Historia = Models.historia;
			var hist_post = req.body;
			var historia_anterior = hist_post.historia_anterior;
			var evolucion = hist_post.evolucion;
			var contenido = hist_post.contenido;
			var antecedente = hist_post.antecedente;
			var evolucion = hist_post.evolucion;

			//--------------------------------------
				// table.string('historia_anterior');
				// table.text('evolucion');
				// table.text('contenido');
				// table.text('antecedente');
			//--------------------------------------

			new Historia({
				historia_anterior: historia_anterior,
				evolucion: evolucion,
				contenido: contenido,
				antecedente: antecedente
			})
			.save()
			.then(function(new_historia){
				console.log(`{new_historia: ${new_historia}}`);
            	Message(res, 'Success', '0', new_historia);
			})
			.catch(function(error){
            	console.log(`{error: ${error}}`);
            	Message(res, error.detail, error.code, null);
        	});
	    });

	   // 	router.post('/', function (req, res) {

    //     console.log('Groups Create');
    //     //Model Instance
    //     var Group = Models.group;
    //     var group_post = req.body;
    //     var phase_id = group_post.phase_id;
    //     var name = group_post.name;

    //     new Group({
    //         name: name,
    //         phase_id: phase_id
    //     }).save().then(function(new_group){
    //         console.log(`{new_group: ${new_group}}`);
    //         Message(res, 'Success', '0', new_group);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });
    // });


    router.put('/:historia_id', function(req, res, next){

        console.log('Update Historia Medica');
        //Model Instance
        var historia = new Models.historia;

        //URL Request, Season Id
        var historia_id = req.params.historia_id;
        var hist_upd = req.body;

        console.log(`hist_upd: ${hist_upd.historia_anterior}, ${hist_upd.evolucion}, ${hist_upd.contenido}, ${hist_upd.antecedente}`);
        Knex('historias')
        .where('id','=',historia_id)
        .where('active','=',1)
        .update(hist_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
            	Message(res, 'Success', '0', result);
            } else {
                Message(res, 'Historia not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

	   	// router.get('/:id/historia', function (req, res) {
	    // 	var paciente_id = req.params.id;
	    // 	console.log('user id: ', paciente_id);
	    //     return Models.paciente
	    //     .where({id:paciente_id})
	    //     .fetch({withRelated: ['historia']})
	    //     .then(function (result) {
	    //     	console.log('Result: ', result);
	    //         Message(res,'Success', '0', result);
	    //     }).catch(function(error){
	    //     	console.log('error: ', error);
	    //         Message(res,error.details, error.code, []);
	    //     });
	    // });

		return router;
	});
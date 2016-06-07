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
			console.log('Creacion de consulta Medica');
			var Consulta = Models.consulta;
			var consulta_post = req.body;
			// var antecedente = consulta_post.antecedente;
			// var nombre = pac_post.nombre;
			// var apellido = pac_post.apellido;
			// var alergia = pac_post.alergia;
			// var email = pac_post.email;
			// var telefono_principal = pac_post.telefono_principal;
			// var sexo = pac_post.sexo;
			// var cedula = pac_post.cedula;
			// var fecha_nacimiento = pac_post.fecha_nacimiento;

			//--------------------------------------
			      // "antecedente": "something in the past",
			      // "tratamiento": "Mucho reposo",
			      // "fecha": "2015-10-08T23:00:00.000Z",
			      // "active": true,
			      // "historia_id": 1,
			      // "tipo_consulta_id": 1,
			//--------------------------------------

			new Consulta(consulta_post)
			.save()
			.then(function(new_consulta){
				console.log(`{new_historia: ${new_consulta}}`);
            	Message(res, 'Success', '0', new_consulta);
			})
			.catch(function(error){
            	console.log(`{error: ${error}}`);
            	Message(res, error.detail, error.code, null);
        	});
	    });


	    router.put('/:consulta_id', function(req, res, next){
        	console.log('Consulta PUT');
        	//Model Instance
        	var Consulta = new Models.consulta;
        	//URL Request, Season Id
        	var consulta_id = req.params.consulta_id;
        	var consulta_upd = req.body;

        	// var competition_id = season_upd.competition_id;
        	// var name = season_upd.name;
        	// var description = season_upd.description;
        	// var game_title = season_upd.game_title;

        	// console.log('--------------------');
        	// console.log("competition_id: " + competition_id);
        	// console.log("name: " + name);
        	// console.log("description: " + description);
        	// console.log("game_title: " + game_title);
        	// console.log('--------------------');

	        Knex(Consulta.tableName)
	        .where('id','=',consulta_id)
	        .where('active','=',1)
	        .update(consulta_upd, ['id'])
	        .then(function(result){
	            if (result.length != 0){
	                console.log('result is not null');
	                console.log(`result: ${result[0]}`);
	                // var email = result[0].email;
	            // send_email_from(email, 'Your new Somosport Password!', `Your new somosport Password is: ${generated_password}` );
	            Message(res, 'Success', '0', result);
	            } else {
	                Message(res, 'consulta not found', '404', result);
	            }
	        })
	        .catch(function(err){
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
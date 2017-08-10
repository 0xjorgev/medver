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

          // console.log('get all pacients')

          return Models.paciente
	        .query(function(qb){})
	        .fetchAll()
	        .then(function (result) {
            // console.log(result)
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    router.get('/:id', function (req, res) {
	    	var paciente_id = req.params.id;
	        return Models.paciente
	        .where({id:paciente_id})
	        .fetch({withRelated:[]})
	        .then(function (result) {
	            Message(res,'Success', '0', result);
	        }).catch(function(error){
	            Message(res,error.details, error.code, []);
	        });
	    });

	    //Create new Paciente
	   	router.post('/', function (req, res) {
			// console.log('Creacion de Historia Medica');
			var Historia = Models.historia;
			var Paciente = Models.paciente;
			var pac_post = req.body;
			var historia_anterior = pac_post.historia_anterior;
			var nombre = pac_post.nombre;
			var apellido = pac_post.apellido;
			var alergia = pac_post.alergia;
			var email = pac_post.email;
			var telefono_principal = pac_post.telefono_principal;
			var sexo = pac_post.sexo;
			var cedula = pac_post.cedula;
			var fecha_nacimiento = pac_post.fecha_nacimiento;

			new Historia({
				historia_anterior: historia_anterior,
				evolucion: "",
				contenido: "",
				antecedente: ""
			})
			.save()
			.then(function(new_historia){
				// console.log('new: '+new_historia.id);
				new Paciente({
					nombre: nombre,
					apellido: apellido,
					alergia: alergia,
					email: email,
					telefono_principal: telefono_principal,
					sexo: sexo,
					cedula: cedula,
					fecha_nacimiento: fecha_nacimiento,
					historia_id: new_historia.id
				}).save()
				.then(function(new_pac){
					// console.log(`{new_pac: ${new_pac}}`);
					Message(res, 'Success', '0', new_pac);
				})
				.catch(function(error){
					// console.log(`{error: ${error}}`);
            		Message(res, error.detail, error.code, null);
				});
				console.log(`{new_historia: ${new_historia}}`);
            	//Message(res, 'Success', '0', new_historia);
			})
			.catch(function(error){
            	console.log(`{error: ${error}}`);
            	Message(res, error.detail, error.code, null);
        	});
	    });


	    router.put('/:pac_id', function(req, res, next){
        	// console.log('Paciente PUT');
        	//Model Instance
        	var paciente = new Models.paciente;
        	//URL Request, Season Id
        	var pac_id = req.params.pac_id;
        	var pac_upd = req.body;

        	// console.log('--------------------');
        	// console.log("pac_id: " + pac_id);
        	// console.log(`pac_upd: `, pac_upd);
        	// console.log('--------------------');

        	var pu = {}
        	if (pac_upd.id != undefined) pu.id = pac_upd.id
			if (pac_upd.nombre != undefined) pu.nombre = pac_upd.nombre
			if (pac_upd.apellido != undefined) pu.apellido = pac_upd.apellido
			if (pac_upd.alergia != undefined) pu.alergia = pac_upd.alergia
			if (pac_upd.email != undefined) pu.email = pac_upd.email
			if (pac_upd.telefono_principal != undefined) pu.telefono_principal = pac_upd.telefono_principal
			if (pac_upd.sexo != undefined) pu.sexo = pac_upd.sexo
			if (pac_upd.cedula != undefined) pu.cedula = pac_upd.cedula
			if (pac_upd.historia_anterior != undefined) pu.historia_anterior = pac_upd.historia_anterior
			if (pac_upd.active != undefined) pu.active = pac_upd.active
			if (pac_upd.fecha_nacimiento != undefined) pu.fecha_nacimiento = pac_upd.fecha_nacimiento
			if (pac_upd.historia_id != undefined) pu.historia_id = pac_upd.historia_id
			if (pac_upd.telefono_movil != undefined) pu.telefono_movil = pac_upd.telefono_movil
			if (pac_upd.telefono_emergencias != undefined) pu.telefono_emergencias = pac_upd.telefono_emergencias
			if (pac_upd.tipo_documento != undefined) pu.tipo_documento = pac_upd.tipo_documento
			if (pac_upd.sigla_documento != undefined) pu.sigla_documento = pac_upd.sigla_documento
			if (pac_upd.numero_documento != undefined) pu.numero_documento = pac_upd.numero_documento

        	// console.log('--------------------');
        	// console.log(`pu: `, pu);
        	// console.log('--------------------');

	        Knex(paciente.tableName)
	        .where('id', '=', pu.id)
	        .update(pu, ['id'])
	        .then(function(result){
	            if (result.length != 0){
	                // console.log('result is not null');
	                // console.log(`result: ${result[0]}`);
	                // var email = result[0].email;
	            	// send_email_from(email, 'Your new Somosport Password!', `Your new somosport Password is: ${generated_password}` );
	            	Message(res, 'Success', '0', result);
	            } else {
	                Message(res, 'paciente not found', '404', result);
	            }
	        })
	        .catch(function(err){
	        	console.log(err)
	          	Message(res, err.detail, err.code, null);
	        });
    	});

	   	router.get('/:id/historia', function (req, res) {
	    	var paciente_id = req.params.id;
	    	// console.log('user id: ', paciente_id);
	        return Models.paciente
	        .where({id:paciente_id})
	        .fetch({withRelated: [], debug:true})
	        .then(function (result) {
	        	// console.log('res: '+ result.attributes.historia_id);
	        	return Models.historia
	        	.where({id:result.attributes.historia_id})
	        	.fetch({withRelated: ['paciente', 'consultas']})
	        	.then(function (hist) {
	        		// console.log('result: ', hist);
	            	Message(res,'Success', '0', hist);
	        	})
	        	.catch(function(error){
	        		// console.log('error: ', error);
	            	Message(res,error.details, error.code, []);
	        	});
	        	console.log('Result: ', result);
	         //    Message(res,'Success', '0', result);
	        }).catch(function(error){
	        	console.log('error: ', error);
	            Message(res,error.details, error.code, []);
	        });
	    });

		return router;
	});

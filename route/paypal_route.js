if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'../model/index'
		,'../util/request_message_util'
		,'../util/knex_util'
		,'util'
		,'../util/response_message_util'
		,'../util/generic_util'
		,'../util/logger_util'
		,'https'
		,'../util/object_map_util'
		,'../util/email_sender_util'
		,'fs'
	], (express
		,Models
		,Message
		,Knex
		,util
		,Response
		,utilities
		,logger
		,https
		,ReplaceHelper
		,Email
		,fs
	) => {

	let router = express.Router();

	const fetchPaymentStatus = (res, status, cat_id, team_id) => {
		return Models.status_type
		.where({'description': status})
		.fetch()
		.then(function(result){
			updateCompetitionCategory(res, cat_id, team_id, result.id);
		})
		.catch(function(err){
			console.log("Error on status Fetch");
		});
	}

	const updateCompetitionCategory = (res, cat_id, team_id, status_id) => {

		var pre_reg = new Models.category_group_phase_team;
		var data = {}
		data.team_id = team_id
		data.category_id = cat_id
		return Knex(pre_reg.tableName)
		.where('category_id','=',cat_id)
		.where('active','=',1)
		.where('team_id','=', team_id)
		.update({'payment' : true, 'status_id':status_id}, ['id'])
		.then(function(result){

			// var email_template = email_status_template("pre-registration-paid")
			//el unico template que importa al actualizar el pago es este
			data.template = './template/email/Alianza/payed-$LANG.html'
			var owner_email = team_owner_email(data)
		})
		.catch(function(err){
			Response(res, 'Paypal');
		});
	}

	const requestPaypalCompletion = (option, cat_id, team_id) => {
		updateCompetitionCategory(cat_id, team_id);
	}

	//=========================================================================
	// Servicio invocado por paypal para entregar la informacion del pago
	//=========================================================================
	router.post('/', (req, res) => {
		var body = req.body;
		var json = JSON.parse(body.custom);
		var cat_id = json.category_id;
		var team_id = json.team_id;
		var payment_status = body.payment_status;
		// var cmd_body = 'cmd=_notify-validate&' + JSON.stringify(body);
		// var options = {
		// 	//url: 'https://www.sandbox.paypal.com/cgi-bin/webscr',
		//   // host: 'https://ipnpb.sandbox.paypal.com',
		//   host: 'ipnpb.sandbox.paypal.com',
		//   path: '/cgi-bin/webscr',
		//   port: 443,
		// 	method: 'POST',
		// 	headers: {
		// 		'Connection': 'close',
		//     'Content-Type': 'application/json',
		//     'Content-Length': cmd_body.length
		// 	},
		// 	body: cmd_body,
		// 	strictSSL: true,
		// 	rejectUnauthorized: false,
		// 	requestCert: true,
		// 	agent: false
		// };

		console.log('IPN FROM PAYPAL');
		logger.debug(body)

		if (payment_status == "Completed") {
			console.log('Status is completed');

			fetchPaymentStatus(res, 'Paid', cat_id, team_id);
			//updateCompetitionCategory(cat_id, team_id);
			//requestPaypalCompletion(options, cat_id, team_id)

			//post to thirdparty service
			Response(res, 'Done!')
		}
		else {
			Response(res, 'Paypal')
		}
	});

	//==========================================================================
	// Get previous status send Email by Status
	//==========================================================================

	const send_status_email = function(data){
		// console.log("Status Email ", data.template)
		var tag = {
			COACH_KEY: `${data.user.attributes.username}`
			,TEAM_KEY: `${data.team.attributes.name}`
			,TORNEO_KEY: `${data.category.relations.season.relations.competition.attributes.name}`
			,CATEGORIA_KEY: `${data.category.attributes.name}`
			,CIUDAD_KEY: `${JSON.parse(data.category.relations.season.attributes.meta).ciudad}`
		}

		const prefLang =  (pref) => {
			return (pref !== null && pref !== undefined) ? pref.toUpperCase() : 'EN'
		}

		const preSubject =  (pref) => {
			if (pref !== null && pref !== undefined ) {
				const subject = null
				switch(pref){
					case "ES":
						subject = 'Información de registro para Torneos Alianza de Futbol'
						break;
					default:
						subject = 'Alianza de Futbol: Tournament registration information'
						break;
				}
				return subject
			}
			else {
				return 'Alianza de Futbol: Tournament registration information'
			}
		}

		const emailTemplate = data.template.replace('$LANG', prefLang(data.user.attributes.lang))
		const emailSubject = prefSubject(data.user.attributes.lang)

		var template = template_string_replace(emailTemplate
			,tag
			,process.env.SENDER_EMAIL
			,emailSubject
			,data.user.attributes.email)
	}

	//==========================================================================
	// Get previous status send Email by Status
	//==========================================================================
	const template_string_replace = function(file, tag, sender, subject, to){
		fs.readFile(file, 'utf8', function(err, contents) {
			contents = ReplaceHelper(tag, contents)
			var send = Email(process.env.SENDER_EMAIL)
			send(to, subject, contents)
		});
	}

	//==========================================================================
	//Find current owner (User) based on team_id
	//==========================================================================
	const team_owner_email = (data) => {
		//Buscar Id entidad Team_id
		//entity_relationship -> to (id_entidad_equipo) -> relationship_Type 1 (Owner)
		return Models.entity
		.where({object_id:data.team_id, active:true, object_type:'teams'})
		.fetch()
		.then(function(result){
			// console.log("Object_id", result.attributes.object_id)
			// console.log("Entity_id", result.attributes.id)
			return Models.entity_relationship
			.where({ent_ref_to_id:result.attributes.id, relationship_type_id:1, active:true})
			.fetch({withRelated:['from', 'to']})
			.then(function(innerResult){
				// console.log("Father Object_id: " , innerResult.relations.from.attributes.object_id)
				return Models.user
				.where({id:innerResult.relations.from.attributes.object_id})
				.fetch()
				.then(function(user_result){
					data.user = user_result
					// console.log("User Found: ", user_result)
					//return user_result
					team_data(data)
				})
				.catch(function(user_error){
					// console.log("No user Found!: ", user_error)
					return user_error
				})
			})
			.catch(function(InnerError){
				return InnerError
			})
		})
		.catch(function(error){
			return error
		});
	}

	//==========================================================================
	// Get Team Full Data
	//==========================================================================
	const team_data = (data) => {
		return Models.team
		.where({id:data.team_id, active:true})
		.fetch()
		.then((result) => {
			data.team = result
			// console.log("Team Data: ", data)
			competition_data(data)
			//return data
		})
		.catch((error) => {
			return {}
		})
	}

	//==========================================================================
	// Get Competition Full Data
	//==========================================================================
	const competition_data = (data) => {
		return Models.category
		.where({id:data.category_id, active:true})
		.fetch({withRelated:'season.competition'})
		.then((result) => {
			data.category = result
			var status_email = send_status_email(data)
			return
			// console.log("Full Data: ", data)
			// console.log("Season Rel Data: ", JSON.parse(data.category.relations.season.attributes.meta).ciudad)
			//return data
		})
		.catch((error) => {
			return {}
		})
	}

	return router;
});



	//   const requestPaypalCompletion = (option, cat_id, team_id) => {
	//
	//     updateCompetitionCategory(cat_id, team_id);
	//
	//
	// 	console.log('Before testReq', option);
	//
	// 	const reqTest = https.request(option, function(res) {
	// 		// console.log('body!', body);
	//
	// 		// if(response){
	// 		// 	response.on('data', function (chunk) {
	// 		// 		console.log('Response: ' + chunk);
	// 		// 		console.log('Inside testReq: ', error, response, body);
	// 		// 	});
	// 		//
	// 		// 	if (response.statusCode === 200) {
	// 		// 		//Inspect IPN validation result and act accordingly
	// 		// 		if (body.substring(0, 8) === 'VERIFIED') {
	// 		//
	// 		// 			//The IPN is verified
	// 		// 			console.log('Verified IPN!');
	// 		// 			//updateCompetitionCategory(cat_id, team_id);
	// 		// 		} else if (body.substring(0, 7) === 'INVALID') {
	// 		//
	// 		// 			//The IPN invalid
	// 		// 			console.log('Invalid IPN!');
	// 		// 		} else {
	// 		// 			//Unexpected response body
	// 		// 			console.log('Unexpected response body!');
	// 		// 			console.log(body);
	// 		// 		}
	// 		// 	}
	// 		// 	else{
	// 		// 		//Unexpected response
	// 		// 		console.log('Unexpected response!');
	// 		// 		console.log(response);
	// 		// 	}
	// 		// }
	//
	// 		console.log(`STATUS: ${res.statusCode}`);
	// 		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	//
	// 		res.setEncoding('utf8');
	// 		res.on('data', (chunk) => {
	// 			console.log(`BODY: ${chunk}`);
	// 		});
	// 		res.on('end', () => {
	// 			console.log('No more data in response.');
	// 		});
	// 	})
	//
	// 	reqTest.on('error', (e) => {
	// 	  console.log(`problem with request: ${e.message}`);
	// 	});
	//
	//   return reqTest
	// 	// reqTest.end();
	// }

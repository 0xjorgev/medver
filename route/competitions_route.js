if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express'
		,'util'
		,'../model/index'
		,'../util/request_message_util'
		,'../util/response_message_util'
		,'../util/knex_util'
		,'../util/email_sender_util'
		,'../helpers/auth_helper'
		,'../node_modules/lodash/lodash.min'
		,'../util/logger_util']
		,(express
			,util
			,Models
			,Message
			,Response
			,Knex
			,Email
			,auth
			,lodash
		 	,logger) => {

	let router = express.Router()
	var send_email_from = Email(process.env.SENDER_EMAIL);

	router.get('/:comp_id/admin_user/', function(req, res, next){

		// .then((result) => {
		//	 var adminData = compData.competition_user.map((u) => {
		//		 return {competition_id: compData.id, user_id: u.users.id}
		//	 })
		//	 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', adminData)
		//	 // var adminData = [
		//	 //	 {competition_id: competition_id, user_id: 12, active: true },
		//	 //	 {competition_id: competition_id, user_id: 10, active: true },
		//	 //	 {competition_id: competition_id, user_id: 11, active: true },
		//	 //	 ]
		//	 // return new Models.competition_user(JSON.stringify(adminData)).save()
		//	 return Knex.insert(adminData).into('competitions_users')
		// })


		console.log('Competitions Admins');
		var comp_id = req.params.comp_id;
		// console.log('Model: ' , Models.competition_user.tableName);
		return Models.competition_user
		.where({competition_id :comp_id})
		.where({active:true})
		.fetchAll({withRelated: ['users']})
		.then(function(result){
			//console.log('Res: ', result);
			Message(res,'Success', ' 0', result);
		})
		.catch(function(err){
			console.log('err: ', err);
			Message(res, err.detail, err.code, null);
		});
	});

	//List of competitions
	router.get('/', function (req, res) {
		//req._currentUser is the user recovered from token
		//to get competitions the user should have these permissions
		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'competitions'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		return Models.competition
			.query(function(qb){
				qb.distinct() //TODO: el query está devolviendo una competicion por usuario
				qb.innerJoin('competitions_users', 'competitions_users.competition_id', 'competitions.id')

				if (req._currentUser && req._currentUser.id){
					qb.where({'competitions_users.user_id': req._currentUser.id})
					//el creador de la competencia no necesariamente tiene permisos de edicion, pero deberia poder verla
					qb.orWhere({'competitions.created_by_id': req._currentUser.id})
				}

				if(req._sortBy){
					req._sortBy.map((sort) => {
						qb.orderBy(sort[0], sort[1])
					})
				}

				if(req._limit){
					qb.limit(req._limit)
					if(req._offset) qb.offset(req._offset)
				}
			})
			.fetchAll({
				withRelated: [
					'discipline'
					,'subdiscipline'
					,'competition_type'
					,'seasons.categories.category_type'
					,'seasons.categories.gender'
					,'seasons.categories.classification'
					// ,'seasons.categories.phases.groups'
					,'competition_user.users']
			})
			.then(result => {
				//se elimina el password de los users
				result = result.map(comp => {
					comp.relations.competition_user
					.map(user => {
						delete user.relations.users.attributes.password
						return user
					})
					return comp
				})
				Response(res, result)}
			)
			.catch(error => Response(res, null, error) )
	});

	//Competitions Types List -> Array of results [Competition_type]
	router.get('/competition_type', function(req, res){
		return Models.competition_type
			.fetchAll()
			.then((result) => Response(res, result) )
			.catch((error) => Response(res, null, error) );
	});

	//Competition by Id
	router.get('/:competition_id', function (req, res) {
		var comp_id = req.params.competition_id;
		return Models.competition
			.where({'id': comp_id })
			.fetch( {withRelated: ['discipline','subdiscipline', 'competition_type', 'seasons', 'competition_user.users']} )
			.then((result) => {
				//se elimina el password de los users para no retornarlo en el request
				result.relations.competition_user.map((user) => {
					delete user.relations.users.attributes.password
					return user
				})
				Response(res, result)}
			)
			.catch((error) => Response(res, null, error) )
	});

	//Seasons by Competition_Id -> Returns array of result
	router.get('/:competition_id/season/', function (req, res) {
		var competition_id = req.params.competition_id;
		return Models.season
			.where({competition_id:competition_id})
			.fetchAll()
			.then((result) => Response(res, result))
			.catch((error) => Response(res, null, error));
	});

	router.post('/:competition_id/contact/', function (req, res) {

		var Contact = Models.contact;
		var contact_post = req.body;
		var competition_id = req.params.competition_id;

		console.log('Req values', req.body);

		var country = contact_post.country;
		var state = contact_post.state;
		var city = contact_post.city;
		var zip_code = contact_post.zip_code;
		var phone = contact_post.phone;
		var email = contact_post.email;
		var website_url = contact_post.website_url;

		new Contact({contact_post})
		.save()
		.then(function(new_contact){
			Response(res, new_contact)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	//Competition Contact by competition_id
	router.get('/:competition_id/contact/', function (req, res) {
		var competition_id = req.params.competition_id;
		return Models.contact
		.where('competition_id','=',competition_id)
		.fetchAll()
		.then(function (result) {
			Response(res, result)
		}).catch(function(error){
			Response(res, null, error)
		});
	});

	//Competition Contact by contact_id
	router.get('/:competition_id/contact/:contact_id', function (req, res) {

		var competition_id = req.params.competition_id;
		var contact_id = req.params.contact_id;

		console.log('Req values:', req.body);

		return Models.contact
		.where({competition_id:competition_id, id:contact_id})
		.fetchAll()
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	//Competition Contact Update
	router.put('/:competition_id/contact/:contact_id', function(req, res){

		var Contact = Models.contact;
		var competition_id = req.params.competition_id;
		var contact_id = req.params.contact_id;
		var contact_upd = req.body;

		Knex('contacts')
		.where('id','=',contact_id)
		.where('competition_id','=',competition_id)
		.update(contact_upd, ['id'])
		.then(function(result){
			if (result.length != 0){
				console.log(`result`, result);
				Response(res, result)
			} else {
				//TODO: cuando cae en esta condicion? probar
				Message(res, 'Wrong Competition_id or contact_id', '404', result);
				// Response(res, null, error)
			}
		})
		.catch(function(err){
			Response(res, null, error)
		});
	});

	//Create Competition
	router.post('/', function (req, res) {
		logger.debug(req.body)

		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'competitions'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		const competitionPost = {
			name: req.body.name,
			discipline_id: req.body.discipline_id,
			subdiscipline_id: req.body.subdiscipline_id,
			competition_type_id: req.body.competition_type_id,
			description: req.body.description,
			img_url: req.body.img_url,
			is_published: req.body.is_published,
			created_by_id: req._currentUser.id,
			meta: req.body.meta
		}

		let newCompetition = null
		//por defecto, al momento de la creacion, se coloca al usuario creador como admin
		Models.competition.forge(competitionPost)
		.save()
		.then(result => {
			newCompetition = result
			return new Models.competition_user({
				competition_id: newCompetition.attributes.id,
				user_id: competitionPost.created_by_id
			})
			.save()
		})
		.then(result => Response(res, newCompetition))
		.catch(error => Response(res, null, error))
	})

	//Competition Update
	router.put('/:competition_id/', (req, res) => {
		const competition = Models.competition
		const competition_id = req.params.competition_id
		const upd_published = false
		const compData = req.body

		logger.debug('Request body')
		logger.debug(compData)
		logger.debug(competition_id)

		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'competitions'
			,object_id: req.params.competition_id
			,permissions: ['owner', 'admin']
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		var competition_upd = {
			name: req.body.name,
			description: req.body.description,
			discipline_id: req.body.discipline_id,
			subdiscipline_id: req.body.subdiscipline_id,
			competition_type_id: req.body.competition_type_id,
			is_published: req.body.is_published,
			img_url: req.body.img_url,
			meta: req.body.meta
		}

		var thisCompetition = null

		// Obtengo los datos de la competition antes de actualizar
		Models.competition
		.where( {'id': competition_id, 'active': true})
		.fetch({withRelated: ['competition_user.users']})
		.then((result) => {
			thisCompetition = result
			return Knex('competitions')
				.where({id: result.attributes.id})
				.update(competition_upd, ['id'])
		})
		.then((result) => {
			//should I send emails to admins?
			var newIsPublished = competition_upd.is_published
			var oldIsPublished = thisCompetition.attributes.is_published

			if(newIsPublished != oldIsPublished) {
				var fullUrl = `${process.env.COMPETITION_PORTAL_URL}/${competition_id}`
				thisCompetition.relations.competition_user.map((u) => {
					console.log(`Sending mails to ${u.relations.users.attributes.email}`)
					send_email_from(u.relations.users.attributes.email,
						'Your competition has been published!',
						'Your new competition portal is now live!\n' +
						'Check it out at ' + fullUrl)
				})
			}
			return result
		})
		.then((result) => Response(res, result) )
		.catch((error) => Response(res, null, error) )
	});

	router.get('/rcompetition/:competition_id', function (req, res) {
		var comp_id = req.params.competition_id;
		return Models.competition
		.where({'id':comp_id})
		.fetch( {withRelated: ['discipline.subdisciplines',
			'competition_user.users',
			'competition_type',
			'seasons.categories.category_type',
			'seasons.categories.gender',
			'seasons.categories.classification',
			'seasons.categories.phases.groups']} )
		.then(function (result) {
			Response(res, result)
		})
		.catch(function(error){
			Response(res, null, error)
		});
	});

	//Publish a competition
	router.put('/:competition_id/season/:season_id/category/:category_id/publish', function(req, res) {
		var competition_id = req.params.competition_id
		var season_id = req.params.season_id
		var category_id = req.params.category_id
		var thisCompetition = undefined

		console.log('Req body', req.body)

		Models.competition
		.where( {'id': competition_id, 'active': true})
		.fetch({withRelated: ['competition_user.users']})
		.then((result) => {
			thisCompetition = result
			return Knex('competitions')
				.where({'id': competition_id})
				.update({ is_published: req.body.is_published }, ['id'])
		})
		.then((result) => {
			return Knex('categories')
			.where({'id':category_id})
			.update({ is_published: req.body.is_published }, ['id'])
		})
		.then( (result) => {
			var fullUrl =  `${process.env.COMPETITION_PORTAL_URL}/${competition_id}/season/${season_id}/category/${category_id}/home`
			console.log('Envio de email de actualizacion de la competition ' + fullUrl)
			thisCompetition.relations.competition_user.map((u) => {
				console.log(`Sending mails to ${u.relations.users.attributes.email}`)
				send_email_from(u.relations.users.attributes.email,
					'Your competition has been published!',
					'Your new competition portal is now live!\n' +
					'Check it out at ' + fullUrl)
			})
			return result
		})
		.then((result) => {
			Response(res, result)
		})
		.catch((err) => {
			Response(res, null, err)
		});
	});

	router.get('/query/by_city', (req, res) => {
		//req._currentUser is the user recovered from token
		//to get competitions the user should have these permissions
		var chk = auth.checkPermissions(req._currentUser, ['admin-competition', 'admin'])

		if (chk.code != 0){
			Response(res, null, chk)
			return
		}

		return Models.season
			.query(function(qb){
				// qb.distinct() //TODO: el query está devolviendo una competicion por usuario
				qb.innerJoin('competitions', 'competitions.id', 'seasons.competition_id')
				qb.innerJoin('competitions_users', 'competitions_users.competition_id', 'competitions.id')
				qb.where({'competitions_users.user_id': req._currentUser.id})
				qb.orWhere({'competitions.created_by_id': req._currentUser.id})
				qb.whereNotNull('seasons.meta')
			})
			.fetchAll({
				withRelated: [
					'competition'
					,'competition.discipline'
					,'competition.subdiscipline'
					,'competition.competition_type'
					,'categories']
			})
			.then((result) => {
				var seasons = result.toJSON()
				return seasons.map((season) => {
					try {
						var meta = JSON.parse(season.meta)
						if(meta != null && meta.ciudad) season.city = meta.ciudad
					}
					catch (e) {
						//no metadata received
					}

					return season
				})
			})
			.then((result) => {
				return lodash(result).groupBy('city')
			})
			.then((result) => {
				var cities = result.toJSON()
				return Object.keys(cities).map((city) => {
					var tmp = {}
					tmp[city] = cities[city]
					return tmp
				})
			})
			.then((result) => {
				Response(res, result)
			})

	})

	return router;
});

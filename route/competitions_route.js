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

		let competitionList = null

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
					,'competition_user.users']
			})
			.then(result => {
				competitionList = result.toJSON()
				const competitionIds = competitionList.map(c => c.id )
				// logger.debug(competitionIds)
				return Models.category_group_phase_team
				.query( qb => {
						let fields = ['category_id', 'status_id', 'description_en','description_es']
						qb.select(fields)
						qb.count('*')
						qb.innerJoin('categories', 'categories.id','categories_groups_phases_teams.category_id')
						qb.innerJoin('seasons', 'seasons.id','categories.season_id')
						qb.innerJoin('competitions', 'competitions.id','seasons.competition_id')
						//cambiar esta linea por leftJoin si se quiere mostrar los equipos que tienen status
						qb.innerJoin('status_types', 'status_types.id','categories_groups_phases_teams.status_id')
						qb.groupBy(fields)
						qb.whereIn('competitions.id', competitionIds)
					}
				)
				.fetchAll()
			})
			//bloque para contar el # de status de los equipos dentro de la cateogria
			.then(statusCount => {
				let count = statusCount.toJSON()
				competitionList.map(comp => {
					let compStatusCount = []
					comp.seasons.forEach(season => {
						season.categories.map(cat => {
							cat.status_count = count.filter(c => c.category_id == cat.id)
							if(cat.status_count.length > 0) compStatusCount.push(cat.status_count)
							return cat
						})
					})
					return comp
				})
				return true
			})
			// para calcular el # de statuses de teams x competicion
			.then(result => {
				const competitionIds = competitionList.map(c => c.id )
				return Models.category_group_phase_team
				.query( qb => {
						let fields = ['competition_id','status_id', 'description_en','description_es']
						qb.select(fields)
						qb.count('*')
						qb.innerJoin('categories', 'categories.id','categories_groups_phases_teams.category_id')
						qb.innerJoin('seasons', 'seasons.id','categories.season_id')
						qb.innerJoin('competitions', 'competitions.id','seasons.competition_id')
						//cambiar esta linea por leftJoin si se quiere mostrar los equipos que tienen status null
						qb.innerJoin('status_types', 'status_types.id','categories_groups_phases_teams.status_id')
						qb.groupBy(fields)
						qb.whereIn('competitions.id', competitionIds)
					}
				)
				.fetchAll()
			})
			.then(statusCount => {
				let count = statusCount.toJSON()
				return competitionList.map(comp => {
					comp.status_count = count.filter( c => c.competition_id == comp.id)
					return comp
				})
			})
			.then(result => Response(res, competitionList))
			.catch(error => Response(res, null, error))
	});

	//Competitions Types List -> Array of results [Competition_type]
	router.get('/competition_type', function(req, res){
		return Models.competition_type
			.fetchAll()
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) );
	});

	//Competition by Id
	router.get('/:competition_id', function (req, res) {
		var comp_id = req.params.competition_id;
		return Models.competition
			.where({'id': comp_id })
			.fetch( {withRelated: ['discipline','subdiscipline', 'competition_type', 'seasons', 'competition_user.users']} )
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) )
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

	//Create Competition
	router.post('/', function (req, res) {

		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'competitions'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		logger.debug('Competition POST')
		let competitionPost = buildCompetitionData(req.body)

		let newCompetition = null
		//por defecto, al momento de la creacion, se coloca al usuario creador como admin
		Models.competition.forge(competitionPost)
		.save()
		.then(result => {
			newCompetition = result
			return Models.competition_user.forge({
				competition_id: newCompetition.attributes.id,
				user_id: competitionPost.created_by_id
			})
			.save()
		})
		.then(result => Response(res, newCompetition))
		.catch(error => Response(res, null, error))
	})

	const buildCompetitionData = (data) => {
		let compData = {}
		if(data.id != undefined) compData.id = data.id
		if(data.name != undefined) compData.name = data.name
		if(data.description != undefined) compData.description = data.description
		if(data.discipline_id != undefined) compData.discipline_id = data.discipline_id
		if(data.subdiscipline_id != undefined) compData.subdiscipline_id = data.subdiscipline_id
		if(data.competition_type_id != undefined) compData.competition_type_id = data.competition_type_id
		if(data.is_published != undefined) compData.is_published = data.is_published
		if(data.img_url != undefined) compData.img_url = data.img_url
		if(data.portrait_url != undefined) compData.portrait_url = data.portrait_url
		if(data.created_by_id != undefined) compData.created_by_id = data.created_by_id
		if(data.meta != undefined) compData.meta = data.meta
		logger.debug(compData)
		return compData
	}

	//Competition Update
	router.put('/:competition_id/', function(req, res) {
		const competition_id = req.params.competition_id
		const upd_published = false
		let thisCompetition = null
		let competitionUpd = buildCompetitionData(req.body)

		logger.debug(competitionUpd)

		// const permissionCheck = auth.checkPermissions({
		// 	user: req._currentUser
		// 	,object_type: 'competitions'
		// 	,object_id: req.params.competition_id
		// 	,permissions: ['owner', 'admin']
		// })
		//
		// if (permissionCheck.code != 0){
		// 	Response(res, null, permissionCheck)
		// 	return
		// }

		// Obtengo los datos de la competition antes de actualizar
		Models.competition
		.where( {'id': competition_id, 'active': true})
		.fetch({withRelated: ['competition_user.users']})
		.then((result) => {
			thisCompetition = result
			return Knex('competitions')
				.where({id: result.attributes.id})
				.update(competitionUpd, ['id'])
		})
		.then((result) => {
			//should I send emails to admins?
			const newIsPublished = competitionUpd.is_published
			const oldIsPublished = thisCompetition.attributes.is_published

			if(newIsPublished != oldIsPublished) {
				const fullUrl = `${process.env.COMPETITION_PORTAL_URL}/${competition_id}`
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

		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: 'competitions'
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
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

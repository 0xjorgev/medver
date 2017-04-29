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
		,'lodash'
		,'csv'
		,'moment'
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
			,_
			,csv
			,moment
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

				if(req._pagination.sort) req._pagination.sort.forEach(s => qb.orderBy(s.field, s.direction))
				// if(req._sortBy)
				// 	req._sortBy.map((sort) => qb.orderBy(sort[0], sort[1]))
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

	//servicio para obtener competiciones en general
	router.get('/query', (req, res) => {

		const competitionId = req.query.competition_id
		const seasonId = req.query.season_id
		const seasonYear = req.query.season_year
		const categoryId = req.query.category_id
		const teamStatusId = req.query.team_status_id

		return Models.competition
		.query(qb => {
			if(req._pagination.sort) req._pagination.sort.forEach(s => qb.orderBy(s.field, s.direction))
			if(competitionId != undefined) qb.where('competitions.id', '=', competitionId)
		})
		.fetchPage({
			page: req._pagination.page
			,pageSize: req._pagination.pageSize
			,withRelated: [
				//THIS IS MADNESS!
				{'seasons': (qb) => {
					if(seasonId != undefined) qb.where('seasons.id', '=', seasonId)
					if(seasonYear != undefined){
						const yearStart = new Date(seasonYear, 0, 1)
						const yearEnd = new Date(seasonYear, 11, 31)
						qb.whereBetween('seasons.init_at', [yearStart, yearEnd])
						qb.whereBetween('seasons.ends_at', [yearStart, yearEnd])
					}
				}}
				//NO.
				,{'seasons.categories': qb => {
					if(categoryId != undefined) qb.where('categories.id', '=', categoryId)
				}}
				//THIS
				,{'seasons.categories.participants': qb => {
					if(teamStatusId != undefined){
						qb.where('status_id', teamStatusId)
					}
				}}
				//IS
				,'seasons.categories.participants.team'
				//JS!!!!!!!!!!!
				,'seasons.categories.participants.entity.object'
		]
		})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error) )
	})

	//Competitions Types List -> Array of results [Competition_type]
	router.get('/competition_type', function(req, res){
		return Models.competition_type
			.fetchAll()
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) );
	});

	router.get('/team', (req, res) => {


		const fields =  ' competitions.id as competition_id' +
		' ,competitions.name as competition_name' +
		' ,seasons.id as season_id' +
		' ,seasons.name as season_name' +
		' ,seasons.init_at as season_init_at' +
		' ,seasons.ends_at as season_ends_at' +
		' ,seasons.meta as season_meta' +
		' ,categories.id as category_id' +
		' ,categories.name as category_name' +
		' ,entities.id as entity_id' +
		' ,entities.object_id as entity_object_id' +
		' ,entities.object_type as entity_object_type' +
		' ,players.id as players_id' +
		' ,players.first_name as players_first_name' +
		' ,players.last_name as players_last_name' +
		' ,players.img_url as players_img_url' +
		' ,players.portrait_url as players_portrait_url' +
		' ,players.document_number as players_document_number' +
		' ,players.nickname as players_nickname' +
		' ,players.birthday as players_birthday' +
		' ,players.status_id as players_status_id' +
		' ,players.email as players_email' +
		' ,players.active as players_active' +
		' ,players.created_at as players_created_at' +
		' ,players.updated_at as players_updated_at' +
		' ,players.gender_id as players_gender_id' +
		' ,players.document_img_url as players_document_img_url' +
		' ,players.meta as players_meta' +
		' ,teams.id as teams_id' +
		' ,teams.name as teams_name' +
		' ,teams.logo_url as teams_logo_url' +
		' ,teams.short_name as teams_short_name' +
		' ,teams.description as teams_description' +
		' ,teams.category_type_id as teams_category_type_id' +
		' ,teams.organization_id as teams_organization_id' +
		' ,teams.subdiscipline_id as teams_subdiscipline_id' +
		' ,teams.gender_id as teams_gender_id' +
		' ,teams.active as teams_active' +
		' ,teams.created_at as teams_created_at' +
		' ,teams.updated_at as teams_updated_at' +
		' ,teams.meta as teams_meta' +
		' ,teams.portrait_url as teams_portrait_url' +
		' ,teams.club_id as teams_club_id' +
		' ,categories_groups_phases_teams.*'


		let query = 'select $FIELDS$' +
			// 	' competitions.id as competition_id' +
			// ' ,competitions.name as competition_name' +
			// ' ,seasons.id as season_id' +
			// ' ,seasons.name as season_name' +
			// ' ,seasons.init_at as season_init_at' +
			// ' ,seasons.ends_at as season_ends_at' +
			// ' ,seasons.meta as season_meta' +
			// ' ,categories.id as category_id' +
			// ' ,categories.name as category_name' +
			// ' ,entities.id as entity_id' +
			// ' ,entities.object_id as entity_object_id' +
			// ' ,entities.object_type as entity_object_type' +
			// ' ,players.id as players_id' +
			// ' ,players.first_name as players_first_name' +
			// ' ,players.last_name as players_last_name' +
			// ' ,players.img_url as players_img_url' +
			// ' ,players.portrait_url as players_portrait_url' +
			// ' ,players.document_number as players_document_number' +
			// ' ,players.nickname as players_nickname' +
			// ' ,players.birthday as players_birthday' +
			// ' ,players.status_id as players_status_id' +
			// ' ,players.email as players_email' +
			// ' ,players.active as players_active' +
			// ' ,players.created_at as players_created_at' +
			// ' ,players.updated_at as players_updated_at' +
			// ' ,players.gender_id as players_gender_id' +
			// ' ,players.document_img_url as players_document_img_url' +
			// ' ,players.meta as players_meta' +
			// ' ,teams.id as teams_id' +
			// ' ,teams.name as teams_name' +
			// ' ,teams.logo_url as teams_logo_url' +
			// ' ,teams.short_name as teams_short_name' +
			// ' ,teams.description as teams_description' +
			// ' ,teams.category_type_id as teams_category_type_id' +
			// ' ,teams.organization_id as teams_organization_id' +
			// ' ,teams.subdiscipline_id as teams_subdiscipline_id' +
			// ' ,teams.gender_id as teams_gender_id' +
			// ' ,teams.active as teams_active' +
			// ' ,teams.created_at as teams_created_at' +
			// ' ,teams.updated_at as teams_updated_at' +
			// ' ,teams.meta as teams_meta' +
			// ' ,teams.portrait_url as teams_portrait_url' +
			// ' ,teams.club_id as teams_club_id' +
			// ' ,categories_groups_phases_teams.*' +
		' from categories_groups_phases_teams' +
		' inner join categories on categories.id = categories_groups_phases_teams.category_id' +
		' inner join seasons on seasons.id = categories.season_id' +
		' inner join competitions on competitions.id = seasons.competition_id' +
		' inner join entities on categories_groups_phases_teams.entity_id = entities.id' +
		' left join players on entities.object_id = players.id and entities.object_type = \'players\'' +
		' left join teams on entities.object_id = teams.id and entities.object_type = \'teams\''

		//filtros
		if(req.query.competition_id || req.query.season_id ||
			req.query.season_year || req.query.category_id ||
			req.query.team_status_id){

			let params = []

			if(req.query.competition_id != null && req.query.competition_id != undefined)
				params.push(` competition_id = ${req.query.competition_id}`)

			if(req.query.season_id != null && req.query.season_id != undefined){
				params.push(` seasons.id = ${req.query.season_id}`)
			}

			if(req.query.category_id != null && req.query.category_id != undefined){
				params.push(` categories.id = ${req.query.category_id}`)
			}

			if(req.query.team_status_id != null && req.query.team_status_id != undefined){
				params.push(` categories_groups_phases_teams.status_id = ${req.query.team_status_id}`)
			}

			if(req.query.season_year != null && req.query.season_year != undefined){
				let seasonQuery = ` (seasons.init_at between '${req.query.season_year}-01-01' and '${req.query.season_year}-12-31'`
				seasonQuery += ` or seasons.ends_at between '${req.query.season_year}-01-01' and '${req.query.season_year}-12-31')`
				params.push(seasonQuery)
			}

			//se adjuntan las condiciones al query
			query += ` where ${params.join(' and ')}`
		}

		let limit = ' limit $LIMIT offset $OFFSET'

		let finalQuery = query.replace('$FIELDS$', fields)

		//paginacion. no se aplica paginacion si se solicita el csv
		if(!req.query.csv && req._pagination.pageSize && req._pagination.page){
			const offset = req._pagination.page * req._pagination.pageSize
			limit = limit
				.replace('$LIMIT', req._pagination.pageSize)
				.replace('$OFFSET', offset)

			finalQuery += limit 
		}


		let queryResult = null

		Knex.raw(finalQuery)
		.then(results => {
			queryResult = results.rows
			return Knex.raw(query.replace('$FIELDS$', 'count(*)'))
		})
		.then(results => {
			const count = results.rows[0].count

			//TODO: estos son los headers que deberia setear en la respuesta
			//https://www.npmjs.com/package/express-csv
			//si se quieren los resultados via CSV
			if(req.query.csv && req.query.csv == 1){
				csv.stringify(resultingRows, {header: true}, function(err, data){
					if(err){
						Response(res, null, err)
					}
					res.attachment(`report${moment().format('YYYYMMDD_HHmmss')}.csv`);
					res.end(data);
				})
			}
			else{
				queryResult.pagination = {
					page: req._pagination.page
					,pageSize: req._pagination.pageSize
					,pageCount: Math.ceil(count / req._pagination.pageSize)
					,rowCount: count
				}

				Response(res, queryResult)
			}
		})
		.catch(error => Response(res, null, error) )
	})

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

	router.get('/:competition_id/team', (req, res) => {
		return Models.category_group_phase_team
		.where({id: req.params.competition_id})
		.fetchAll({withRelated: [
			'seasons.categories.participants.team'
			,'seasons.categories.participants.entity.object'
		]})
		.then(result => Response(res, result) )
		.catch(error => Response(res, null, error) )
	})

	return router;
});

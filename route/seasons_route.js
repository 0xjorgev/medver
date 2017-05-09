if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express',
		'../model/index',
		'../util/response_message_util',
		'../util/knex_util',
		'../util/logger_util'
	],(
		express,
		Models,
		Response,
		Knex,
		logger
	) => {

		let router = express.Router()

		//TODO: traer todas las temporadas a la vez no tiene mucho sentido. Eliminar
		router.get('/', (req, res) => {
			return Models.season
			.where({active: true})
			.fetchAll({debug: false, withRelated: ['categories']})
			.then(function (result) {
				Response(res, result)
			})
			.catch(function(error){
				Response(res, null, error)
			});
		});

		//Seasons by Id -> Returns 1 result
		router.get('/:season_id', (req, res) => {
			var season_id = req.params.season_id;
			return Models.season
			.where({id:season_id})
			.fetch({withRelated: ['categories', 'categories.gender', 'categories.category_type']})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error))
		});

		const processSeasonRequest = (body => {
			let data = {}
			if(body.id != undefined) data.id = body.id
			if(body.name != undefined) data.name = body.name
			if(body.description != undefined) data.description = body.description
			if(body.game_title != undefined) data.game_title = body.game_title
			if(body.active != undefined) data.active = body.active
			if(body.init_at != undefined) data.init_at = body.init_at
			if(body.ends_at != undefined) data.ends_at = body.ends_at
			if(body.competition_id != undefined) data.competition_id = body.competition_id
			if(body.meta != undefined) data.meta = body.meta

			return data
		})

		router.post('/', function (req, res) {

			//TODO: validar permisologias despues de modificar el checkPermissions
			// var chk = auth.checkPermissions(req._currentUser, ['admin-competition', 'admin'])
			//
			// if (chk.code != 0){
			// 	Response(res, null, chk)
			// 	return
			// }
			//

			//Model Instance
			var Season = Models.season;
			logger.debug('req.body')
			logger.debug(req.body)

			const data = processSeasonRequest(req.body)

			new Season(data).save()
			.then(new_season => {
				Response(res, new_season)
			})
			.catch(error => {
				Response(res, null, error)
			})
		});

		router.put('/:season_id', function(req, res, next){
			logger.debug(req.body)
			const season = new Models.season;
			const season_id = req.params.season_id;
			const data = processSeasonRequest(req.body)

			Knex(season.tableName)
			.where('id','=',season_id)
			.update(data, ['id'])
			.then(result => Response(res, result) )
			.catch(err => Response(res, null, err) )
		});

		//Add to new schema
		//Category Season Methods
		router.get('/:season_id/category', function (req, res) {
			var season_id = req.params.season_id;
			return Models.category
			.where({season_id:season_id})
			//.fetchAll({withRelated: ['phases'], debug:true})
			.fetchAll({withRelated: ['category', 'season', 'classification','gender', 'phases'], debug: false})
			.then(function (result) {
				Response(res, result)
			})
			.catch(function(error){
				Response(res, null, error)
			});
		});

		router.get('/:season_id/category/:cat_id', function (req, res) {
			var season_id = req.params.season_id;
			var cat_id = req.params.cat_id;

			return Models.category
			.where({season_id:season_id})
			.where({id:cat_id})
			.fetch({withRelated: ['category', 'season', 'classification','gender', 'phases'], debug: false})
			.then(function (result) {
				Response(res, result)
			}).catch(function(error){
				Response(res, null, error)
			});
		});

		router.post('/:season_id/category', function (req, res) {
			var season_id = req.params.season_id;
			//Model Instance
			var Category = Models.category;
			var category_post = req.body;
			var competition_id = category_post.competition_id;
			var name = category_post.name;
			var description = category_post.description;
			var game_title = category_post.game_title;
			var init_at = category_post.init_at;
			var ends_at = category_post.ends_at;

			console.log('req.body: ', req.body);

			new Category_Season({
				name: name,
				description:description,
				game_title:game_title,
				init_at:init_at,
				ends_at:ends_at,
				competition_id: competition_id
			})
			.save()
			.then(function(new_category){
				Response(res, new_category)
			})
			.catch(function(error){
				Response(res, null, error)
			});
		});

		router.get('/:season_id/standing_table', (req, res) => {
			Models.season.forge({id: req.params.season_id})
			.fetch({withRelated: 'categories.phases.groups.standing_table.team'})
			.then(result => Response(res, result))
			.catch(error => Response(res, null, error))
		})

		router.get('/:season_id/match', (req, res) => {
			Models.season
			.query(qb => {
				// qb.select(['id','name'])
				qb.where({id: req.params.season_id})
			})
			.fetch({withRelated:
				[
				{'categories': function(qb){
					qb.where({active: true})
				}}
				,{'categories.phases': function(qb){
					qb.where({active: true})
				}}
				,{'categories.phases.groups': function(qb){
					qb.where({active: true})
				}}
				,{'categories.phases.groups.matches': function(qb){ qb.where({active: true}) }}
				,'categories.phases.groups.matches.home_team'
				,'categories.phases.groups.matches.visitor_team'
				,'categories.phases.groups.matches.referee.user'
				,'categories.category_type'

			]})
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error))
		})

		return router;
	});

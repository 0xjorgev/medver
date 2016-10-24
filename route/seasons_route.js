/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express',
	'../model/index',
	'../util/request_message_util',
	'../util/response_message_util',
	'../util/knex_util'], function (express,
		Models,
		Message,
		Response,
		Knex) {

    var router = express.Router();

    router.get('/', function (req, res) {
        return Models.season
        .query(function(qb){})
        .where({active:true})
        .fetchAll({debug:true, withRelated: ['categories']})
        .then(function (result) {
            Response(res, result)
        }).catch(function(error){
			Response(res, null, error)
        });
    });

    //Seasons by Id -> Returns 1 result
    router.get('/:season_id', function (req, res) {
        var season_id = req.params.season_id;
        return Models.season
        .where({id:season_id})
        .fetch({withRelated: ['categories']})
        .then(function (result) {
			Response(res, result)
        }).catch(function(error){
			Response(res, null, error)
        });
    });

    router.post('/', function (req, res) {
        //Model Instance
        var Season = Models.season;
        var season_post = req.body;
        var competition_id = season_post.competition_id;
        var name = season_post.name;
        var description = season_post.description;
        var game_title = season_post.game_title;
        var init_at = season_post.init_at;
        var ends_at = season_post.ends_at;

        console.log('req.body: ', req.body);

        new Season(season_post)
		.save()
		.then(function(new_season){
            Response(res, new_season)
        })
		.catch(function(error){
			Response(res, null, error)
        });
    });


    router.put('/:season_id', function(req, res, next){
        console.log('Season PUT', req.body);
        //Model Instance
        var season = new Models.season;

        //URL Request, Season Id
        var season_id = req.params.season_id;
        var season_upd = req.body;
        var competition_id = season_upd.competition_id;
        var name = season_upd.name;
        var description = season_upd.description;
        var game_title = season_upd.game_title;

        Knex(season.tableName)
        .where('id','=',season_id)
        .where('active','=',1)
        .update(season_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
            	Response(res, result)
            } else {
                Message(res, 'Username or email not found', '404', result);
            }
        })
        .catch(function(err){
			Response(res, null, err)
        });
    });

    //Add to new schemma
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

    return router;
});

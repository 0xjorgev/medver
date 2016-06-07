/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of seasons (don't seem to be needed) -> Returns Array of result
    router.get('/', function (req, res) {
        return Models.category
        .query(function(qb){})
        .where({active:true})
        .fetchAll({withRelated: []})
        //.fetchAll({withRelated: ['gender', 'phases', 'clasification']})
        //.fetchAll({withRelated: ['gender', 'season']})
        .then(function (result) {
            console.log('result: ' + result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log('Error: ' + error);
            Message(res,error.details, error.code, []);
        });
    });

    //Categories by Id -> Returns 1 result
    router.get('/:category_id', function (req, res) {

        var category_id = req.params.category_id;

        return Models.category
        .where({id:category_id})
        .where({active:true})
        .fetch({withRelated: []})
        //.fetch({withRelated: ['gender','phases', 'clasification']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });


    //Teams by Category
    // router.get('/:category_id/team', function (req, res) {

    //     console.log("Teams by Category");

    //     var category_id = req.params.category_id;

    //     return Models.team
    //     .where({category_id:category_id})
    //     .where({active:true})
    //     .fetchAll()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // router.post('/', function (req, res) {

    //     //Model Instance
    //     var Category = Models.category;
    //     var category_post = req.body;
    //     var gender_id = category_post.gender_id;
    //     var season_id = category_post.season_id;
    //     var name = category_post.name;
    //     var description = category_post.description;
    //     var image_url = category_post.image_url;
    //     var inscription_init_at = category_post.inscription_init_at;
    //     var inscription_ends_at = category_post.inscription_ends_at;
    //     //V 1.1
    //     var minimum_value = category_post.minimum_value;
    //     var maximum_value = category_post.maximum_value;

    //     console.log('--------------------');
    //     console.log("season_id: " + competition_id);
    //     console.log("name: " + name);
    //     console.log("gender_id: " + gender_id);
    //     console.log("inscription_init_at: " + inscription_init_at);
    //     console.log("inscription_ends_at: " + inscription_ends_at);
    //     console.log("minimum_value: " + minimum_value);
    //     console.log("maximum_value: " + maximum_value);
    //     console.log("image_url: " + image_url);
    //     console.log('--------------------');

    //         table.increments('id');
    //         table.string('name');
    //         table.text('description');
    //         table.boolean('active').notNullable().defaultTo(true);
    //         table.string('image_url');
    //         table.timestamp('inscription_init_at');
    //         table.timestamp('inscription_ends_at');
    //         table.string('condition');
    //         table.integer('minimun_value');
    //         table.integer('maximun_value');
    //         table.integer('gender_id').references('genders.id').index();
    //         table.integer('season_id').references('seasons.id').index();
    //         table.timestamp('created_at').defaultTo(knex.fn.now());
    //         table.timestamp('updated_at').defaultTo(knex.fn.now());


    //     new Category({
    //         name: name,
    //         description:description,
    //         image_url:image_url,
    //         inscription_init_at:inscription_init_at,
    //         inscription_ends_at:inscription_ends_at,
    //         gender_id: gender_id,
    //         season_id: season_id,
    //         minimun_value: minimum_value,
    //         maximun_value: maximum_value
    //     }).save().then(function(new_category){
    //         console.log(`{new_category: ${new_category}}`);
    //         Message(res, 'Success', '0', new_category);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });
    // });


    // router.put('/:category_id', function(req, res, next){
    //     //Model Instance
    //     var category = new Models.category;

    //     //URL Request, Season Id
    //     var category_id = req.params.category_id;
    //     var category_upd = req.body;

    //     console.log('--------------------');
    //     console.log("season_id: " + competition_id);
    //     console.log("name: " + name);
    //     console.log("gender_id: " + gender_id);
    //     console.log("inscription_init_at: " + inscription_init_at);
    //     console.log("inscription_ends_at: " + inscription_ends_at);
    //     console.log("minimum_value: " + minimum_value);
    //     console.log("maximum_value: " + maximum_value);
    //     console.log("image_url: " + image_url);
    //     console.log('--------------------');

    //     Knex(category.tableName)
    //     .where('id','=',category_id)
    //     .where('active','=',1)
    //     .update(category_upd, ['id'])
    //     .then(function(result){
    //         if (result.length != 0){
    //             console.log('result is not null');
    //             console.log(`result: ${result[0]}`);
    //             // var email = result[0].email;
    //         // send_email_from(email, 'Your new Somosport Password!', `Your new somosport Password is: ${generated_password}` );
    //         Message(res, 'Success', '0', result);
    //         } else {

    //             Message(res, 'Category not found', '404', result);
    //         }
    //     })
    //     .catch(function(err){
    //         console.log(`error: ${err}`);
    //       Message(res, err.detail, err.code, null);
    //     });
    // });

    return router;
});
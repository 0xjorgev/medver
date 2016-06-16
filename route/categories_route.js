/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    var mapper = function(phase) {
      // console.log('Phase:', phase.attributes);
      phase.relations.groups.models.map(groupMapper);
      phaseDelete(phase.attributes.id);
    }

    var groupMapper = function(group){
      groupDelete(group);
    }

    var groupDelete = function(group){
      console.log('Group Delete');
      Knex(group.tableName)
      .where({id:group.id})
      .del().then(function(del_group){
        console.log('del_group', del_group);
      }).catch(function(error){
        console.log('del_group error:', error);
      })
    }

    var phaseDelete = function(phase){
      console.log('Phase Delete');
      //console.log('Phase id:', phase.attributes);
      Knex('phases')
      .where({id:phase}, ['id'])
      .del().then(function(del_phase){
        console.log('del_phase', del_phase);
      }).catch(function(error){
        console.log('del_phase error:', error);
      })
    }
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

    //Teams by Category
    router.get('/:category_id/team', function (req, res) {

        console.log("Teams by Category");
        var category_id = req.params.category_id;

        return Models.category_group_phase_team
        .where({category_id:category_id})
        .where({active:true})
        .fetchAll({withRelated:['team']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //List of seasons (don't seem to be needed) -> Returns Array of result
    router.get('/', function (req, res) {
        return Models.category
        .query(function(qb){})
        .where({active:true})
        //.fetchAll({withRelated: []})
        .fetchAll({withRelated: ['gender', 'phases', 'classification']})
        //.fetchAll({withRelated: ['gender', 'season']})
        .then(function (result) {
             // console.log('result: ' + result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            // console.log('Error: ' + error);
            Message(res,error.details, error.code, []);
        });
    });

    //Categories by Id -> Returns 1 result
    router.get('/:category_id', function (req, res) {

        var category_id = req.params.category_id;

        return Models.category
        .where({id:category_id})
        .where({active:true})
        //.fetch({withRelated: []})
        .fetch({withRelated: ['gender','phases', 'classification']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.post('/', function (req, res) {

        //Model Instance
        var Category = Models.category;
        var category_post = req.body;
        // var gender_id = category_post.gender_id;
        // var season_id = category_post.season_id;
        // var name = category_post.name;
        // var description = category_post.description;
        // var image_url = category_post.image_url;
        // var inscription_init_at = category_post.inscription_init_at;
        // var inscription_ends_at = category_post.inscription_ends_at;
        // //V 1.1
        // var minimum_value = category_post.minimum_value;
        // var maximum_value = category_post.maximum_value;

        // console.log('--------------------');
        // console.log("season_id: " + competition_id);
        // console.log("name: " + name);
        // console.log("gender_id: " + gender_id);
        // console.log("inscription_init_at: " + inscription_init_at);
        // console.log("inscription_ends_at: " + inscription_ends_at);
        // console.log("minimum_value: " + minimum_value);
        // console.log("maximum_value: " + maximum_value);
        // console.log("image_url: " + image_url);
        // console.log('--------------------');

        new Category(category_post
        // {
        //     name: name,
        //     description:description,
        //     image_url:image_url,
        //     inscription_init_at:inscription_init_at,
        //     inscription_ends_at:inscription_ends_at,
        //     gender_id: gender_id,
        //     season_id: season_id,
        //     minimun_value: minimum_value,
        //     maximun_value: maximum_value
        // }
        ).save().then(function(new_category){
            console.log(`{new_category: ${new_category}}`);
            Message(res, 'Success', '0', new_category);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });


    router.put('/:category_id', function(req, res, next){
        //Model Instance
        var category = new Models.category;

        //URL Request, Season Id
        var category_id = req.params.category_id;
        var category_upd = req.body;

        console.log('--------------------');
        // console.log("season_id: " + competition_id);
        // console.log("name: " + name);
        // console.log("gender_id: " + gender_id);
        // console.log("inscription_init_at: " + inscription_init_at);
        // console.log("inscription_ends_at: " + inscription_ends_at);
        // console.log("minimum_value: " + minimum_value);
        // console.log("maximum_value: " + maximum_value);
        // console.log("image_url: " + image_url);
        console.log('--------------------');

        Knex(category.tableName)
        .where('id','=',category_id)
        .where('active','=',1)
        .update(category_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                Message(res, 'Category not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    //Cascade delete for Phases -> Groups
    router.delete('/:category_id', function(req, res, next){
        var category_id = req.params.category_id;

        console.log('--------------------');
        console.log(`-----Category / Phase / ${category_id} Delete-----`);
        console.log('--------------------');

        return Models.phase
        .query(function(qb){})
        .where('category_id','=',category_id)
        .where({active:true})
        .fetchAll({withRelated:['groups']})
        .then(function(result){
          console.log('result: delete cascade');
          result.map(mapper);
          //this.phaseDelete(result.attributes.id);
          Message(res, 'Delete successful', 0, null);
        }).catch(function(err){
            console.log(`error: ${err}`);
            Message(res, err.detail, err.code, null);
        });
    });

    //==========================================================================
    // Standing table service
    //==========================================================================

    router.get('/:category_id/standing_table', function(req, res){

        var category_id = req.params.category_id;

        console.log('\n=======================================================\n')
        console.log('standing_table of category', category_id)

        //TODO:  all the functions used in this method should be in a separate js file

        var dummy_data = [ { team_id: 1, points: 6, goals: 3, matches: 3 },
                          { team_id: 2, points: 7, goals: 4, matches: 3 },
                          { team_id: 3, points: 0, goals: 2, matches: 3 },
                          { team_id: 4, points: 4, goals: 3, matches: 3 } ];

        //TODO: se puede colocar la logica de negocio en el model?

        //1- obtener matches de la categoria
        var test = Models.category//.where('category_id','=',category_id)

        console.log(test)
        console.log('\n=======================================================\n')

        //2- obtener eventos tipo gol asociados a la categoria
        //3- ???
        //4- Profit / standing-non-dummy-table

        return Message(res, 'Success', 0, test);
    });


    return router;
});

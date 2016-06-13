/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of teams
    router.get('/', function (req, res) {

        console.log('Teams List');
        return Models.team
        .query(function(qb){})
        .where({active:true})
        .fetchAll({withRelated: ['category_type', 'organization', 'player_team.player'], debug:true})
        //.fetchAll({withRelated: ['gender', 'season']})
        .then(function (result) {
            console.log('result: ' + result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log('Error: ' + error);
            Message(res,error.details, error.code, []);
        });
    });

    //Team by Id -> Returns  [] result
    // router.get('/:team_id/player', function (req, res) {
    //
    // console.log('Team Players by team_id');
    //     var team_id = req.params.team_id;
    //
    //     return Models.player_team
    //     .where({team_id:team_id})
    //     .where({active:true})
    //     .fetchAll({withRelated: ['player'], debug: true})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    //
    //     // return Models.team
    //     // .where({id:team_id})
    //     // .where({active:true})
    //     // .fetch({withRelated: ['category']})
    //     // .then(function (result) {
    //     //     Message(res,'Success', '0', result);
    //     // }).catch(function(error){
    //     //     Message(res,error.details, error.code, []);
    //     // });
    // });

    router.get('/:team_id/player', function (req, res) {
        console.log('Team Players by team_id');
        var team_id = req.params.team_id;

        return Models.player_team
        .where({team_id:team_id})
        .where({active:true})
        .fetchAll({withRelated: ['player'], debug: true})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

        //Team by Id -> Returns 1 result
    router.get('/:team_id', function (req, res) {

        console.log('Team by id');

        var team_id = req.params.team_id;

        return Models.team
        .where({id:team_id})
        .where({active:true})
        //.fetchAll({withRelated: ['category_type'], debug: true})
        .fetch({withRelated: ['category_type', 'organization', 'player_team.player'], debug: true})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });

        // return Models.team
        // .where({id:team_id})
        // .where({active:true})
        // .fetch({withRelated: ['category']})
        // .then(function (result) {
        //     Message(res,'Success', '0', result);
        // }).catch(function(error){
        //     Message(res,error.details, error.code, []);
        // });
    });

    // //'category', 'organization'
    // router.get('/:org_id/organization/', function (req, res) {

    //     console.log('Rounds by group_id');

    //      var group_id = req.params.group_id;
    //     return Models.round
    //     .where({'group_id':group_id})
    //     .fetch({withRelated: ['group']})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    router.post('/organization/:org_id/category/:cat_id', function (req, res) {

        console.log('Team Create');
        //Model Instance
        var Team        = Models.team;
        var team_post   = req.body;
        var org_id      = req.params.org_id;
        var cat_id      = req.params.cat_id;
        var logo_url    =  req.params.logo_url;
        var short_name  =  req.params.short_name;
        var description =  req.params.description;
        var name        = group_post.name;

        new Team(
            team_post
        // {
        //     name: name,
        //     organization_id: org_id,
        //     category_id: cat_id,
        //     logo_url: logo_url,
        //     short_name: short_name,
        //     description: description
        // }
        ).save().then(function(new_team){
            console.log(`{new_team: ${new_team}}`);
            Message(res, 'Success', '0', new_team);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });
    });


    router.put('/:team_id', function(req, res, next){

        console.log('Team Update');
        //Model Instance
        var group = new Models.group;

        //URL Request, Season Id
        var team_id = req.params.team_id;
        var team_upd = req.body;

        Knex(group.tableName)
        .where('id','=',team_id)
        .where('active','=',1)
        .update(team_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
            Message(res, 'Success', '0', result);
            } else {
                Message(res, 'team not found', '404', result);
            }
        })
        .catch(function(err){
            console.log(`error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});

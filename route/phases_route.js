/**
 * Created by george on 25/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();
    // var _ = require('lodash');
    function teamMap(team){
        return team.relations;
    }

    function groupMap(group){
        var innerObject = group.relations.category_group_phase_team.models;
        var delta_group = group;
        delta_group.relations = null;
        return { group:delta_group, teams:innerObject.map(innerMap)  };
    }

    function innerMap(inner){
        return inner.relations.team;
    }

    //Teams by Phase
    router.get('/:phase_id/team', function (req, res) {

        console.log("Teams by Phase");
        var phase_id = req.params.phase_id;

        return Models.category_group_phase_team
        .where({phase_id:phase_id})
        .where({active:true})
        .fetchAll({withRelated:['team']})
        .then(function (result) {
            Message(res,'Success', '0', result.models.map(teamMap));
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Groups & teams by Phase
    router.get('/:phase_id/group_team', function (req, res) {

        console.log("Groups and Teams by Phase");
        var phase_id = req.params.phase_id;

        return Models.group
        .query(function(qb){})
        .where({'phase_id':phase_id})
        .where({active:true})
        .fetchAll({withRelated: ['category_group_phase_team.team']})
        .then(function (result) {
            // console.log("Res :", result);
            //console.log("Res Map:", result.models.map(groupMap));
            Message(res,'Success', '0', result.models.map(groupMap));
        }).catch(function(error){
            console.log("Error :", error);
            Message(res,error.details, error.code, []);
        });
    });


    //Phase, group, round team by Phase_id
    router.get('/:phase_id/group_round_match', function (req, res) {

        console.log("Group_round_match");
        var phase_id = req.params.phase_id;

        return Models.group
        .query(function(qb){})
        .where({'phase_id':phase_id})
        .where({active:true})
        .fetchAll({withRelated: ['rounds.matches.home_team', 'rounds.matches.visitor_team']})
        .then(function (result) {
            console.log("Res :", result);
            //console.log("Res Map:", result.models.map(groupMap));
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log("Error :", error);
            Message(res,error.details, error.code, []);
        });
    });

    console.log('Phases Route');

    //List of competitions
    router.get('/', function (req, res) {

        console.log('Phase List');

        return Models.phase
        .query(function(qb){
            // qb.limit(25);
        })
        .where({active:true})
        .fetchAll({withRelated: ['groups', 'category']} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Phase by phase_id
    router.get('/:phase_id', function (req, res) {
        console.log('phase_id List');
         var phase_id = req.params.phase_id;
        return Models.phase
        .where({'id':phase_id})
        .where({active:true})
        .fetch({withRelated: ['groups']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //teams by Phase_id
    // router.get('/:phase_id/team', function (req, res) {
    //     console.log('List teams by Phase Id');
    //     var phase_id = req.params.phase_id;
    //     return Models.group
    //     .where({'id':phase_id})
    //     .fetch({withRelated: ['rounds']})
    //     .then(function (round) {
    //           var round_id = round.id;
    //         return Models.match
    //         .where({'round_id':round_id})
    //         .fetchAll({withRelated: ['home_team', 'visitor_team']})
    //         .then(function (result) {
    //             var zip = result.map(teamMap);
    //             var flat = flatArray(zip);
    //             Message(res,'Success', '0', flat);
    //         }).catch(function(error){
    //             Message(res,error.details, error.code, []);
    //         });
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // //teams by Phase_id
    // router.get('/:phase_id/group', function (req, res) {
    //     console.log('List groups by Phase Id');
    //     var phase_id = req.params.phase_id;
    //     return Models.group
    //     .where({'id':phase_id})
    //     .fetch({withRelated: ['rounds']})
    //     .then(function (round) {
    //         var round_id = round.id;
    //         return Models.match
    //         .where({'round_id':round_id})
    //         .fetchAll({withRelated: ['home_team', 'visitor_team']})
    //         .then(function (result) {
    //             var zip = result.map(teamMap);
    //             var flat = flatArray(zip);
    //             Message(res,'Success', '0', flat);
    //         }).catch(function(error){
    //             Message(res,error.details, error.code, []);
    //         });
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });



    // this.getGroup(group_id) {
    //     return Models.round
    //     .where({'group_id':group_id})
    //     .fetch({withRelated: ['rounds']})
    //     .then(function (result) {
    //        return result;
    //     }).catch(function(error){
    //         return error;
    //     });
    // }

    // function getMatch(round_id) {
    //     console.log("Round function!", round_id);
    //     return Models.match
    //     .where({'round_id':round_id})
    //     .fetchAll({withRelated: ['home_team', 'visitor_team']})
    //     .then(function (result) {
    //        return result;
    //     }).catch(function(error){
    //         return error;
    //     });
    // };


    // //Groups by Phase_id
    // router.get('/:phase_id/group/', function (req, res) {

    //     console.log('Group by phase_id');

    //     var phase_id = req.params.phase_id;

    //     return Models.group
    //     .where({phase_id:phase_id})
    //     .where({active:true})
    //     .fetch({withRelated: ['phase']})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    // //Phases by category_id -> Returns array of result
    // router.get('/category/:category_id', function (req, res) {
    //     console.log('/category/:category_id/');
    //     var category_id = req.params.category_id;
    //     return Models.phase
    //     .where({category_id:category_id})
    //     .fetchAll()
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });


    router.post('/', function (req, res) {
    	var Phase = Models.phase;
    	var phase_post = req.body;


    	console.log('Req Values:' + req.body);
     //    var category_id = phase_post.category_id;
    	// var name = phase_post.name;
    	// var position = phase_post.position;

     //    console.log('------------------------------');
     //    console.log(`name:${name}`);
     //    console.log(`position:${position}`);
     //    console.log('------------------------------');

        new Phase(phase_post
        // {
        //     name: name,
        //     position: position,
        //     category_id:category_id
        // }
        ).save().then(function(new_phase){
            console.log(`{new_phase: ${new_phase}}`);
            Message(res, 'Success', '0', new_phase);
        }).catch(function(error){
            console.log(`{error: ${error}}`);
            Message(res, error.detail, error.code, null);
        });

    });


    router.put('/:phase_id', function (req, res) {

        console.log('update /:phase_id');
        //Model Instance
        var Phase = Models.phase;

        var phase_id = req.params.phase_id;
        var phase_upd = req.body;

        // Knex(competition.tableName)
        Knex('phases')
        .where('id','=',phase_id)
        .update(phase_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                // console.log('result is not null');
                // console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                // console.log(`{error: ${error}}`);
                Message(res, 'Wrong phase_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    return router;
});

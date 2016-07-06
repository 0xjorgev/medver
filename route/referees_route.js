/**
 * Created by george on 25/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    console.log('Phases Route');

    //List of Referees by Match
    router.get('/match/:match_id', function (req, res) {

        console.log('Referees by Match');
        var match_id = req.params.match_id;

        return Models.match_referee
        .where({'match_id':match_id})
        .fetchAll({withRelated: ['user'], debug:true} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //List of Matchs by referee
    router.get('/:referee_id', function (req, res) {

        console.log('Match by referee_id');
        var referee_id = req.params.referee_id;
        return Models.match_referee
        .where({'referee_id':referee_id})
        .fetchAll({withRelated: ['match.home_team.category_type', 'match.visitor_team.category_type', 'match.round.group.phase.category.season.competition'], debug:true} )
        .then(function (result) {
            console.log('result :', result);
            Message(res,'Success', '0', result);
        }).catch(function(error){
            console.log('error :', error);
            Message(res,error.details, error.code, []);
        });
    });


    router.post('/', function (req, res) {
        var Match_referee = Models.match_referee;
        var match_referee_post = req.body;

        console.log('Post req values:' + req.body);
        var match_id = match_referee_post.match_id;
        var referee_id = match_referee_post.referee_id;

            console.log('------------------------------');
            console.log(`match_id:${match_id}`);
            console.log(`referee_id:${referee_id}`);
            console.log('------------------------------');

            new Match_referee(match_referee_post
            // {
            //     match_id: match_id,
            //     referee_id: referee_id
            // }
            ).save().then(function(new_match_referee){
                console.log(`{new_match_referee: ${new_match_referee}}`);


                Message(res, 'Success', '0', new_match_referee);
            }).catch(function(error){
                console.log(`{error: ${error}}`);
                Message(res, error.detail, error.code, null);
            });
    });

        router.put('/:match_referee_id', function (req, res) {

        console.log('update /:match_referee_id');
        //Model Instance
        var match_referee_id = req.params.match_referee_id
        var Match_referee = Models.match_referee;
        var match_referee_post = req.body;

        // Knex(competition.tableName)
        Knex(Match_referee.tableName)
        .where('id','=',match_referee_id)
        .update(phase_upd, ['id'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                console.log(`result: ${result[0]}`);
                Message(res, 'Success', '0', result);
            } else {
                console.log(`{error: ${error}}`);
                Message(res, 'Wrong phase_id', '404', result);
            }
        })
        .catch(function(err){
            console.log(`Catch Error: ${err}`);
          Message(res, err.detail, err.code, null);
        });
    });

    //Phase by phase_id
    // router.get('/:phase_id', function (req, res) {
    //     console.log('phase_id List');
    //      var phase_id = req.params.phase_id;
    //     return Models.phase
    //     .where({'id':phase_id})
    //     .fetch({withRelated: ['groups']})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

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


    // router.post('/', function (req, res) {
    // 	var Phase = Models.phase;
    // 	var phase_post = req.body;


    // 	console.log('Req Values:' + req.body);
    //     var category_id = phase_post.category_id;
    // 	var name = phase_post.name;
    // 	var position = phase_post.position;

    //     console.log('------------------------------');
    //     console.log(`name:${name}`);
    //     console.log(`position:${position}`);
    //     console.log('------------------------------');

    //     new Phase({
    //         name: name,
    //         position: position,
    //         category_id:category_id
    //     }).save().then(function(new_phase){
    //         console.log(`{new_phase: ${new_phase}}`);
    //         Message(res, 'Success', '0', new_phase);
    //     }).catch(function(error){
    //         console.log(`{error: ${error}}`);
    //         Message(res, error.detail, error.code, null);
    //     });

    // });

    return router;
});

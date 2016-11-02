/**
 * Created by george on 25/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'
    ,'../model/index'
    ,'../util/request_message_util'
    ,'../util/knex_util']
    , function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of Referees by Match
    router.get('/match/:match_id', function (req, res) {
        var match_id = req.params.match_id;

        return Models.match_referee
        .where({'match_id':match_id})
        .fetchAll({withRelated: ['user'], debug: false} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        })
        .catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //List of Matchs by referee
    router.get('/:referee_id', function (req, res) {
        var referee_id = req.params.referee_id;
        return Models.match_referee
        .where({'referee_id':referee_id})
        .fetchAll({withRelated: [
            'match.home_team.category_type',
            'match.visitor_team.category_type',
            'match.round.group.phase.category.season.competition'],
            debug: false} )
        .then(function (result) {
            Message(res,'Success', '0', result);
        })
        .catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });


    router.post('/', function (req, res) {
        var Match_referee = Models.match_referee;
        var match_referee_post = req.body;

        console.log('Post req values:' + req.body);
        var match_id = match_referee_post.match_id;
        var referee_id = match_referee_post.referee_id;

            new Match_referee(match_referee_post)
            .save()
            .then(function(new_match_referee){
                Message(res, 'Success', '0', new_match_referee);
            }).catch(function(error){
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
            Message(res, err.detail, err.code, null);
        });
    });

    return router;
});

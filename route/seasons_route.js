/**
 * Created by george on 08/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util'], function (express, Models, Message) {

    var router = express.Router();

    //List of seasons (don't seem to be needed) -> Returns Array of result
    router.get('/', function (req, res) {
        return Models.season
        .query(function(qb){})
        .fetchAll({withRelated: ['competition']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Seasons by Id -> Returns 1 result
    router.get('/:season_id', function (req, res) {
        var season_id = req.params.season_id;
        return Models.season
        .where({id:season_id})
        .fetch({withRelated: ['competition']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Seasons by Competition_Id -> Returns array of result
    router.get('/related/:competition_id', function (req, res) {
        var competition_id = req.params.competition_id;
        return Models.season
        .where({competition_id:competition_id})
        .fetchAll({withRelated: ['competition']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Competition by Id
    // router.get('/:competition_id', function (req, res) {

    //     var comp_id = req.params.competition_id;
    //     return Models.competition
    //     .where({'id':comp_id})
    //     .fetch( {withRelated: ['discipline','subdiscipline', 'type', 'season']} )
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });


    return router;
});
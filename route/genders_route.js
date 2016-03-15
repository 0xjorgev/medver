/**
 * Created by greg on 16/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util'], function (express, Models, Message) {

    var router = express.Router();

    router.get('/', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.gender
        .query(function(qb){})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:gender_id', function (req, res) {

        var gender_id = req.params.gender_id;
        // tapping into Knex query builder to modify query being run
        return Models.gender
        .where({'id':gender_id})
        .fetch()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    return router;
});
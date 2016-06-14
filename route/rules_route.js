/**
 * Created by greg on 16/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util','../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    router.get('/', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.rule
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:rule_id', function (req, res) {

        var rule_id = req.params.rule_id;
        // tapping into Knex query builder to modify query being run
        return Models.rule
        .where({'id':rule_id})
        .fetch()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    return router;
});
/**
 * Created by Francisco on 29/07/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util','../util/knex_util'], function (express, Models, Message, Knex) {

    var router = express.Router();

    //Get all position from table
    router.get('/', function (req, res) {
        return Models.position
        .where({active:true})
        .fetchAll()//{withRelated: ['subdisciplines']}
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    //Get a position by id
    router.get('/:position_id', function (req, res) {

        var position_id = req.params.position_id;

        return Models.position
        .where({'id':position_id})
        .where({active:true})
        .fetch()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    return router;
});
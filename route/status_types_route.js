/**
 * Created by Francisco on 04/11/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'
    ,'../model/index'
    ,'../util/request_message_util'
    ,'../util/knex_util'
    ,'../util/response_message_util'],
    function (express, Models, Message, Knex, Response) {

    var router = express.Router();

    router.get('/', function (req, res) {
        return Models.status_type
        .query(function(qb){})
        .where({active:true})
        .fetchAll()
        .then((result) => Response(res, result))
        .catch((error) =>  Response(res, null, error))
    });

    router.get('/:status_type_id', function (req, res) {
        var status_type_id = req.params.status_type_id;
        return Models.status_type
        .query(function(qb){})
        .where({id:status_type_id, active:true})
        .fetch()
        .then(result => Response(res, result))
        .catch(error =>  Response(res, null, error))
    });

    router.get('/type/:type/', function (req, res) {
        var type = req.params.type
        return Models.status_type
        .where({type:type, active:true})
        .fetchAll()
        .then(result => Response(res, result))
        .catch(error =>  Response(res, null, error))
    });

    return router;
});

/**
 * Created by george on 27/04/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/knex_util',], function (express, Models, Message, Knex) {

    var router = express.Router();

    //List of Events
    //Event by Subdiscipline_id -> Returns array
    //
    router.get('/:subdiscipline_id/event', function (req, res) {

        var subdiscipline_id = req.params.subdiscipline_id;

        return Models.event
        .where({subdiscipline_id:subdiscipline_id})
        .where({active:true})
        .fetchAll({withRelated: [], debug: false})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

	return router;
});

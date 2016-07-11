/**
 * Created by greg on 28/04/15.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util'], function (express, Models, Message) {

    var router = express.Router();

    router.get('/:subdiscipline_id/event', function (req, res) {

        console.log('Events by Subdiscipline');

        var subdiscipline_id = req.params.subdiscipline_id;

        return Models.event
        .where({subdiscipline_id:subdiscipline_id})
        .where({active:true})
        .fetchAll({withRelated: [], debug: true})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    return router;
});

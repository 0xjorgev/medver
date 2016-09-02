if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util', '../util/response_message_util'], function (express, Models, Message, Response) {

    var router = express.Router();

    router.get('/', function (req, res) {
        console.log('Discipline get all');
        // tapping into Knex query builder to modify query being run
        return Models.discipline
        .query(function(qb){
            qb.limit(25);
        })
        .fetchAll({withRelated: ['subdisciplines']})
        .then(function (result) {
            Response(res, result)
        })
        .catch(function(error){
            Response(res, null, error)
        });
    });


    router.get('/:discipline', function (req, res) {
        var dis = req.params.discipline;

        return Models.discipline.where({'id':dis})
        .fetch({withRelated: ['subdisciplines']})
        .then(function (result) {
            Response(res, result)
        }).catch(function(error){
            Response(res, null, error)
        });
    });

    router.get('/:discipline/subdiscipline/', function (req, res) {
        var dis = req.params.discipline;

        return Models.subdiscipline.where({'discipline_id':dis})
        .fetchAll()
        .then(function (result) {
            Response(res, result)
        }).catch(function(error){
            Response(res, null, error)
        });
    });

    router.get('/subdiscipline/:subdiscipline_id/event', function (req, res) {
        var sub = req.params.subdiscipline_id;
        return Models.event
        .where({'subdiscipline_id': sub})
        .fetchAll({debug: false})
        .then(function (result) {
            Response(res, result)
        }).catch(function(error){
            Response(res, null, error)
        });
    });

    return router;
});
/**
 * Created by greg on 28/04/15.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../util/request_message_util'], function (express, Models, Message) {

    var router = express.Router();

    router.get('/', function (req, res) {

        console.log('Discipline get all');
        // tapping into Knex query builder to modify query being run
        return Models.discipline
        .query(function(qb){
            qb.limit(25);
        }).fetchAll({withRelated: ['subdisciplines']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    // router.get('/subdiscipline', function (req, res) {

    //     console.log('Discipline get /subdiscipline');
    //     // tapping into Knex query builder to modify query being run
    //     return Models.subdiscipline.query(function(qb){
    //         qb.limit(25);
    //     }).fetchAll({withRelated: ['discipline'], debug: true})
    //     .then(function (result) {
    //         Message(res,'Success', '0', result);
    //     }).catch(function(error){
    //         Message(res,error.details, error.code, []);
    //     });
    // });

    router.get('/:discipline', function (req, res) {

        console.log('Discipline get /:discipline');
        var dis = req.params.discipline;
        // tapping into Knex query builder to modify query being run
        return Models.discipline.where({'id':dis})
        .fetch({withRelated: ['subdisciplines']})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    router.get('/:discipline/subdiscipline/', function (req, res) {

        console.log('SubDiscipline by Discipline');
        var dis = req.params.discipline;
        // tapping into Knex query builder to modify query being run
        return Models.subdiscipline.where({'discipline_id':dis})
        .fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

        router.get('/subdiscipline/:subdiscipline_id/event', function (req, res) {

        console.log('-----------------------');
        console.log('Events By subDiscipline');
        console.log('-----------------------');
        // var dis = req.params.discipline_id;
        var sub = req.params.subdiscipline_id;
        // tapping into Knex query builder to modify query being run
        //console.log(Models.event);
        return Models.event
        .where({'subdiscipline_id':sub})
        .fetchAll({debug:true})
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    });

    return router;
});
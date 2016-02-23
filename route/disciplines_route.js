/**
 * Created by greg on 28/04/15.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index'], function (express, Models) {

    var router = express.Router();

    router.get('/', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.discipline.query(function(qb){
            qb.limit(25);
        }).fetchAll({withRelated: ['subdiscipline'], debug: true})
        .then(function (result) {
                res.json(result);
            });
    });

    router.get('/:discipline', function (req, res) {

        var dis = req.params.discipline;
        // tapping into Knex query builder to modify query being run
        return Models.discipline.where({'id':dis})
        .fetch({withRelated: ['subdiscipline']})
        .then(function (result) {
            res.json(result);
        });
    });

    router.get('/subdiscipline', function (req, res) {

        // tapping into Knex query builder to modify query being run
        return Models.subdiscipline.query(function(qb){
            qb.limit(25);
        }).fetchAll({withRelated: ['discipline'], debug: true})
        .then(function (result) {
                res.json(result);
            });
    });

    return router;
});
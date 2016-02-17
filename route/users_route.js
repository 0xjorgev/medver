/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index'], function (express, Models) {

    var router = express.Router();

    router.get('/login/', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        return Models.user.where({

        }).fetchAll()
        .then(function (result) {
                res.json(result);
            });
    });

    return router;
});
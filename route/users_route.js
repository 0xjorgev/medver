/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index'], function (express, Models) {

    var router = express.Router();

    router.post('/login', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        var user_login = req.body;
        var username = user_login['username'];
        var password = user_login['password'];
        console.log(`user_values: ${username} ${password}`);
        res.send(`user_values: ${username} ${password}`);
        // return Models.user.where({

        // }).fetchAll()
        // .then(function (result) {
        //         res.json(result);
        //     });
    });
    return router;
});
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
        var username = user_login.username;
        var password = user_login.password;

        // res.send(`user_values: ${username} ${password}`);
        return Models.user.where({'username':username, 'password':password, 'active':true})
        .fetch().then(function (result) {
            if (result != null){
                console.log('found a user');
                res.json(result);
            } else {
                console.log('user not found');
                res.status(404);
                res.json({'error':'wrong user/password combination'});
            }
        });
    });
    return router;
});
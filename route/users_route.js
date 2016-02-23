/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index'], function (express, Models) {

    var router = express.Router();

    var message = function(res, mess, code, obj){
        res.json({message:mess,code: code, object:obj});
    }

    router.post('/login', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        var user_login = req.body;
        var username = user_login.username;
        var password = user_login.password;
        console.log('req.body: ', req.body);
        console.log(`Request values: ${username}, ${password}`);
        // res.send(`user_values: ${username} ${password}`);
        return Models.user
        .where(function(){ this.where('username',username).orWhere('email',username) })
        .where('password',password)
        .where('active',true)
        .fetch().then(function (result) {
             if (result !== null){
                message(res,'Success', 0, result);
                // res.json(result);
            } else {
                message(res,'Wrong user/password combination', 404, result);
            //     console.log('user not found');

            //     // res.json({'error':'wrong user/password combination'});
             }
        }).catch(function(err){
            console.log(`Error: ${err}`);
            message(res,err.detail, err.code, null);
            // res.json({'error':err});
        });
    });

    //TODO: Add translation to errors!
    router.post('/register', function(req, res, next){

        var new_user = req.body;
        var username = new_user.username;
        var password = new_user.password;
        var email    = new_user.email;
        var User = Models.user;

        new User({
            username: username,
            email:email,
            password:password
        }).save().then(function(newUser){
            message(res, 'Success', 0, newUser);
        }).catch(function(error){
            message(res, error.detail, error.code, null);
        });
    });

    // var update = function(user_id){
    //     return new Models.user.where('id', user_id).update({'password':'24680'}).catch(function(error){
    //         console.log('Nothing to update here');
    //     });
    // };

    router.post('/forgot', function(req, res, next){
        // var User = new Models.user;
        //last
        return new Models.user
        // .where(function(){ this.where('username',username).orWhere('email',username) })
        // .where('active',true)
        // .where('id',1)
        .update({password:'2468'}).then(function (result) {
            if (result !== null){
                console.log('Updated a user');
                res.json(result);
            } else {
                console.log('Nothing ...');
                // res.status(404);
                res.json({'error':'No update on town!'});
            }
        });

        // return User.where('id','=', 1)
        // .update({password:'24680'})
        // .then(function(res){
        //     res.send({result:res});
        //     console.log('sucess!')
        // }).catch(function(err){
        //     console.log({error:err});
        //     res.send({error:err});
        // });
    });
        // var fgot_user = req.body;
        // var username = fgot_user.username || fgot_user.email;

        // Models.user
        // .where(function(){ this.where('username',username).orWhere('email',username) })
        // .where('active',true)
        // .fetch()
        // .then(function (result) {
        //     res.send({'result':result});
        //     if (result !== null){

                // .then()
                // .catch(function(error){
                //     console.log('Nothing to update here');
                //     res.send({'Error':error});
                // });
        //     }
        // })
        // .catch(function(error){
        //     console.log('Nothing to update here');
        //     res.send({'Error':error});
        // })

        /*

.catch(function(error){
            console.log({'error':error.details});
            res.send({'error':error.details});
        });

        */

    return router;
});
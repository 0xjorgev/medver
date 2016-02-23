/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index', '../model/util', 'randomstring'], function (express, Models, Util, random) {

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

        var user_fgt = req.body;
        var username = user_fgt.username || user_fgt.email;
        var generated_password = random.generate({
            length: 8,
            charset:'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890@#$%*&'
        });
        Util('users')
        .where(function(){
            this.where('username',username).orWhere('email',username)
        })
        .where('active','=',1)
        .update({password:generated_password})
        .then(function(result){
            console.log(`new pwd: ${generated_password}`);
            //TODO:
            //Send the email!!
            //Add Md5 to field
            message(res, 'Success', 0, result);
        })
        .catch(function(err){
          message(res, err.detail, err.code, null);
        });
    });

        //Add change PWD
        //Add update Profile

    return router;
});
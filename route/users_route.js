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
        return Models.user
        .where(function(){ this.where('username',username).orWhere('email',username) })
        .where('password',password)
        .where('active',true)
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

    //TODO: Add translation to errors!
    router.post('/register', function(req, res, next){

        var new_user = req.body;
        var username = new_user.username;
        var password = new_user.password;
        var email    = new_user.email;

        Models.util('users').insert({
            username: username,
            email:email,
            password:password
        }).then(function(result){
            res.send({message:'user added', id:result});
            console.log(`User id: ${result}`);
        }).catch(function(error) {
            console.log(error);
            res.send({error:error.detail});
        });

        //         Models.util('users').returning('id').insert({
        //     username: username,
        //     email:email,
        //     password:password
        // }).then(function(result){
        //     res.send({message:'user added', id:result});
        //     console.log(`User id: ${result}`);
        // }).catch(function(error) {
        //     console.log(error);
        //     res.send({error:error.detail});
        // });

        //NOT TODAY!
        // Models.user.insert({
        //     username: username,
        //     email:email,
        //     password:password
        // }).then(function(result){
        //     res.send({message:'user added', id:result});
        //     console.log(`User id: ${result}`);
        // }).catch(function(error) {
        //     console.log(error);
        //     res.send({error:error.detail});
        // });




        // var User = Models.user.create({
        //     username: username,
        //     email:email,
        //     password:password
        // }).then(function(newUser){
        //     res.send('epsito');
        // });



        // new User({
        //     username: username,
        //     email:email,
        //     password:password
        // }).save().then(function(newUser){
        //     res.send('epsito');
        // });

        // return Models.user
        // .insert({
        //     username: username,
        //     email:email,
        //     password:password
        // });
    });

    return router;
});
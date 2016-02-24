/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express',
    '../model/index',
    '../util/password_gen_util',
    '../util/sendgrid_util',
    '../util/knex_util',
    '../util/request_message_util',
    '../util/email_sender_util',
    '../util/md5_gen_util' ], function (express, Models, Pwd_gen, Sendgrid, Knex_util, Message, Email, Md5) {

    var router = express.Router();

    var send_email_from = Email(process.env.SENDER_EMAIL);

    // var message = function(res, mess, code, obj){
    //     res.json({message:mess,code: code, object:obj});
    // }

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
                Message(res,'Success', '0', result);
                // res.json(result);
            } else {
                Message(res,'Wrong user/password combination', 404, result);
            //     console.log('user not found');

            //     // res.json({'error':'wrong user/password combination'});
             }
        }).catch(function(err){
            console.log(`Error: ${err}`);
            Message(res,err.detail, err.code, null);
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
            console.log(`{new_user: ${email}}`);
            console.log(`{user_email: ${email}}`);
            send_email_from(email,'Welcome to Somosport', 'Welcome to Somosport!')
            // email_sender();
            Message(res, 'Success', '0', newUser);
        }).catch(function(error){
            Message(res, error.detail, error.code, null);
        });
    });

    // var update = function(user_id){
    //     return new Models.user.where('id', user_id).update({'password':'24680'}).catch(function(error){
    //         console.log('Nothing to update here');
    //     });
    // };//app46243864@heroku.com
    //h8167juz0757

    router.post('/forgot', function(req, res, next){

        var user = new Models.user;
        var user_fgt = req.body;
        var username = user_fgt.username || user_fgt.email;

        console.log('User Model Table: '+ user.tableName);
        var generated_password = Pwd_gen;
        var md5_pwd = Md5(generated_password);
        // var generated_password = random.generate({
        //     length: 8,
        //     charset:'abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890@#$%*&'
        // });
        Knex_util('users')
        .where(function(){
            this.where('username',username).orWhere('email',username)
        })
        .where('active','=',1)
        .update({password:md5_pwd}, ['id','email'])
        .then(function(result){
            var email = result[0].email;
            //Non Ethical!
            // console.log('Result: '+ email);
            // console.log(`new pwd: ${generated_password}, ${md5_pwd}`);
            // console.log(`Your new somosport Password is: ${generated_password}`);
            send_email_from(email, 'Your new Somosport Password!', `Your new somosport Password is: ${generated_password}` );
            Message(res, 'Success', '0', result);
        })
        .catch(function(err){
          Message(res, err.detail, err.code, null);
        });
    });

    // var email_sender = function(email, subject, content){
    //     Email.send({
    //         to:       `${email}`,
    //         from:     'jorgem@codefuel.me',
    //         subject:  `${subject}`,
    //         text:     `${content}`
    //         }, function(err, json) {
    //             if (err) { return console.error(err); }
    //                 console.log(`Success! json:${json}`);
    //         });
    // }

        //Add change PWD
        //Add update Profile

    return router;
});
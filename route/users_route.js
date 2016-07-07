/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express',
        // 'uuid',
        // 'nJwt',
        '../model/index',
        '../util/password_gen_util',
        '../util/knex_util',
        '../util/request_message_util',
        '../util/email_sender_util',
        '../util/md5_gen_util' ],
        // function (express, uuid, nJwt, Models, Pwd_gen, Knex_util, Message, Email, Md5) {
            function (express, Models, Pwd_gen, Knex_util, Message, Email, Md5) {

    var router = express.Router();
    var send_email_from = Email(process.env.SENDER_EMAIL);
    // var signingKey = uuid.v4(); // For example purposes
    // console.log('secret key:', signingKey);

    router.post('/login', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        var user_login = req.body;
        var username = user_login.username;
        var password = user_login.password;
        // console.log('req.body: ', req.body);
        console.log(`Request values: ${username}, ${password}`);
        // res.send(`user_values: ${username} ${password}`);
        return Models.user
        .where(function(){ this.where('username',username).orWhere('email',username) })
        .where('password',password)
        .where('active',true)
        .fetch().then(function (result) {
             if (result !== null){

                // var userid = result.id;

                // var claims = {
                //     iss: "https://somosportpocdev.herokuapp.com/",  // The URL of your service
                //     sub: `users/${userid}`,    // The UID of the user in your system
                //     scope: "admins" //Provided by the DB
                // }

                // var usr = new Models.user;
                //  usr = result;
                // console.log('usr: ', usr.id);
                console.log('Result:', result.id );
                // console.log('UserId: '+ result.id);
                // var userid = result[0].id;


                // console.log('claims:', claims);
                // var jwt = nJwt.create(claims,signingKey)
                // console.log('Token:', jwt);
                // console.log('Token Compact:', jwt.compact());
                Message(res,'Success', '0', result);
                // res.json(result);
            } else {
                Message(res,'Wrong user/password combination', '404', result);
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

    router.post('/forgot', function(req, res, next){

        var user = new Models.user;
        var user_fgt = req.body;
        var username = user_fgt.username || user_fgt.email;

        var generated_password = Pwd_gen;
        var md5_pwd = Md5(generated_password);

        Knex_util(user.tableName)
        .where(function(){
            this.where('username',username).orWhere('email',username)
        })
        .where('active','=',1)
        .update({password:md5_pwd}, ['id','email'])
        .then(function(result){
            if (result.length != 0){
                console.log('result is not null');
                var email = result[0].email;
            //Non Ethical!
            // console.log('Result: '+ email);
            // console.log(`new pwd: ${generated_password}, ${md5_pwd}`);
            // console.log(`Your new somosport Password is: ${generated_password}`);
            send_email_from(email, 'Your new Somosport Password!', `Your new somosport Password is: ${generated_password}` );
            Message(res, 'Success', '0', result);
            } else {
                Message(res, 'Username or email not found', '404', result);
            }
        })
        .catch(function(err){
          Message(res, err.detail, err.code, null);
        });
    });

    router.post('/change_password', function(req, res, next){
        var user = new Models.user;
        var user_pwd_change = req.body;
        var user_id = user_pwd_change.id;
        var user_new_password = user_pwd_change.new_password;
        var user_old_password = user_pwd_change.old_password;

        Knex_util(user.tableName)
        .where('id','=',user_id)
        .where('active','=',1)
        .where('password','=',user_old_password)
        .update({password:user_new_password}, ['id','email'])
        .then(function(result){
            if (result.length != 0){
                var email = result[0].email;
                send_email_from(email, 'Your new Somosport Password!', 'Your somosport Password had been changed!' );
                Message(res, 'Success', '0', result);
            } else {
                Message(res, 'invalid input data', '404', result);
            }
        })
        .catch(function(err){
          Message(res, err.detail, err.code, null);
        });
    });

    //TODO:
    //Add update Profile

    router.get('/', function(req, res){
        return Models.user.where({active:true}).fetchAll()
        .then(function (result) {
            Message(res,'Success', '0', result);
        }).catch(function(error){
            Message(res,error.details, error.code, []);
        });
    })

    return router;
});
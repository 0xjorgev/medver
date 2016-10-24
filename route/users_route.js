/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
var fs = require('fs')
define(['express',
        'uuid',
        'njwt',
        '../model/index',
        '../util/password_gen_util',
        '../util/knex_util',
        '../util/request_message_util',
        '../util/email_sender_util',
        '../util/md5_gen_util',
        '../util/response_message_util'
         ],
        function (express, uuid, nJwt, Models, Pwd_gen, Knex_util, Message, Email, Md5, Response) {

    var router = express.Router();
    var send_email_from = Email(process.env.SENDER_EMAIL);

    router.post('/login', function (req, res, next) {
        var user_login = req.body;
        var username = user_login.username;
        var password = user_login.password;

        console.log(`Request values`, user_login);

        return Models.user.query((qb) => {
            qb.where('username', username)
            qb.where('password', password)
            qb.where('active', true)
        })
        .fetch()
        .then((result) => {
            if (result !== null){
                var userId = result.id

                var claims = {
                    user: userId,
                    roles: ['admin'],
                    permissions: ['list-all'],
                    lang: 'en'
                }

                var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
                var jwt = nJwt.create(claims, signingKey)

                //TODO: does not expire, for now
                jwt.setExpiration()

                result.attributes['Authorization-Token'] = jwt.compact()
                delete result.attributes.password

                //TODO: test only!
                result.attributes.roles = ['admin', 'player']
                result.attributes.permissions = ['list', 'create', 'update', 'delete']
            }

            // console.log('---------------------------------', result)

            Response(res, result)
        })
        .catch((error) => {
            Response(res, null, error)
        });
    });

    router.post('/register', function(req, res, next){
        var new_user = req.body;
        var username = new_user.username;
        var password = new_user.password;
        var email    = new_user.email;
        var origin = req.headers.origin
        console.log('origin', origin)

        var User = Models.user;

        console.log('Username: ',username)
        new User({
            username: username,
            email:email,
            password:password
        })
        .save().then(function(newUser){
            //content is from template/email/registerUser.html
            var content =  `<td style="padding-left: 21%; color: #000;"><h1>Welcome ${username}</h1><p>To log in just click <a href="${origin}">Login</a> at the top of every page, and then enter your email or username  and password.</p><p class="highlighted-text">Use the following values when prompted to log in:<br/><strong>Username or Email</strong>: ${username} or ${email} <br/></p></td>`    
            send_email_from(email,'Welcome to Somosport', content)

            var claims = {
                user: newUser.id,
                roles: ['admin'],
                permissions: ['list-all'],
                lang: 'en'
            }

            var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
            var jwt = nJwt.create(claims, signingKey)

            //TODO: does not expire, for now
            jwt.setExpiration()

            newUser.attributes['Authorization-Token'] = jwt.compact()
            delete newUser.attributes.password

            //TODO: test only!
            newUser.attributes.roles = ['admin', 'player']
            newUser.attributes.permissions = ['list', 'create', 'update', 'delete']

            // Message(res, 'Success', '0', newUser);
            Response(res, newUser)
        })
        .catch(function(error){
            // Message(res, error.detail, error.code, null);
            Response(res, null, error)
        });
    });
    
    router.post('/reset_password_request', function(req, res, next){

        var user = new Models.user;
        var user_fgt = req.body;
        var username_email = user_fgt.username_email;
        //console.log('req: ',req )
        var origin = req.headers.origin
        console.log('origin: ',origin )
        //Obtengo los datos del usuario
        Knex_util(user.tableName)
        .where(function(){
            this.where('username',username_email)
                .orWhere('email',username_email)
        })
        .then((result) => {
            if(result.length == 0){
                //no user/email was found
                Response(res, result)
                return
            }
            else
            {
                console.log('result',result)      
                var email = result[0].email     
                var username = result[0].username
                //Se crea el token
                var claims = {
                    user: result[0].id,
                    roles: ['admin'],
                    permissions: ['list-all'],
                    lang: 'en'
                }
                var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
                var jwt = nJwt.create(claims, signingKey)
                //TODO: does not expire, for now
                jwt.setExpiration()

                var urlresetPassword = origin+'/reset_password/username/'+ username + '/rq_token/' + jwt.compact()
                console.log('urlresetPassword', urlresetPassword)
                var content =  `<td valign="top" class="top-content action-content" style="padding-left: 21%"><h1>${username},</h1><p>There was recently a request to change the password for your account.</p><p>You can change your password at any time by logging into <a href="${origin}">your account</a>.</p><p>If you requested this password change, click here to reset your password:</p><table cellspacing="0" cellpadding="0" class="action-button"><tr><td><a href="${urlresetPassword}"><span>Reset Password</span></a></td></tr></table><p>If you did not make this request, you can ignore this message and your password will remain the same.</p></td>`
                console.log('content', content)
                send_email_from(email, 'Reset Password Request', content )
                Response(res, result)
            }
        })
        .catch(function(err){
            Response(res, null, err)
        });
    });

    router.put('/reset_password', function(req, res, next){
        var origin = req.headers.origin
        var user_fgt = req.body;
        var username = user_fgt.username
        //Manage token
        var token = user_fgt.token;
        var secretKey = process.env.API_SIGNING_KEY || 's3cr3t'
        var verifiedJwt = nJwt.verify(token, secretKey)

        console.log('user Id: ',verifiedJwt.body.user)
        console.log('new password: ',user_fgt.password)
        console.log('username: ',user_fgt.username)

        var User = new Models.user;

        Knex_util(User.tableName)
        .where('id','=',verifiedJwt.body.user)
        .where('active','=',1)
        .update({
            'password' : user_fgt.password 
        }, ['id'])
        .then(function(result){
            console.log('result of reset password)', result)
            Response(res, result)
        })
        .catch(function(error){
            // Message(res, error.detail, error.code, null);
            Response(res, null, error)
        });
    });

    //TODO: Add profile update
    router.get('/', function(req, res){
        return Models.user
            .where({active:true})
            .fetchAll()
            .then(function (result) {
                Response(res, result)
            }).catch(function(error){
                Response(res, null, error)
            });
    })
    return router;
});
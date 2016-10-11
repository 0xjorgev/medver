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

        new User({
            username: username,
            email:email,
            password:password
        })
        .save().then(function(newUser){
            //content is from template/email/registerUser.html
            var content =  `<td style="padding-left: 21%"><h1>Welcome ${username}</h1><p>To log in just click <a href="${origin}">Login</a> at the top of every page, and then enter your email or username  and password.</p><p class="highlighted-text">Use the following values when prompted to log in:<br/><strong>Username or Email</strong>: ${username} or ${email} <br/></p></td>`    
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
    
    router.post('/recover_password', function(req, res, next){

        var user = new Models.user;
        var user_fgt = req.body;
        var username = user_fgt.username_email;

        var generated_password = Pwd_gen
        console.log('generated_password',generated_password)
        var md5_pwd = Md5(generated_password)

        Knex_util(user.tableName)
        .where(function(){
            this.where('username',username)
                .orWhere('email',username)
        })
        .then((result) => {

            if(result.length == 0){
                //no user/email was found
                Response(res, result)
                return
            }
            return Knex_util(user.tableName)
                .where({id: result[0].id})
                .update({password: md5_pwd}
                , ['id','email','username'])
        })

        .then(function(result){
            if (result.length != 0){
                console.log('result is not null'); 
                console.log('result',result)      
                var email = result[0].email
                var content =  `<td valign="top" class="top-content action-content" style="padding-left: 21%"><!-- Begin Content --><h1>${result[0].username},</h1><p>Your new password is:<strong> ${generated_password}</strong></p><p>You can change your password at any time by logging into <a href="${req.header.origin}">your account</a>.</p></td>`
                console.log('content', content)
                send_email_from(email, 'Your new Somosport Password!', content )
            }
            Response(res, result)
        })
        .catch(function(err){
            Response(res, null, err)
        });
    });

    router.post('/change_password', function(req, res, next){
        var user = new Models.user;
        var user_pwd_change = req.body;
        var username = user_pwd_change.username;
        var user_new_password = user_pwd_change.new_password;
        var user_old_password = user_pwd_change.old_password;


        console.log(user_pwd_change)

        Knex_util(user.tableName)
        .where((qb) => {
            qb.where('username',username)
                .orWhere('email',username)
        })
        .where({active: 1, password: user_old_password})
        .update({password: user_new_password}, ['id','email'])
        .then(function(result){
            if (result.length != 0){
                var email = result[0].email;
                var content = `<table style="width:100%;border-collapse:collapse">  <tbody>     <tr>            <td class="m_4445496107839198780user-action" colspan="2" style="font:14px/1.4285714 Arial,sans-serif;padding:0;line-height:1">              <span>Important information from <strong>Somosport</strong></span>          </td>       </tr>       <tr>            <td class="m_4445496107839198780spacer" style="font:14px/1.4285714 Arial,sans-serif;padding:10px 0 0"></td>     </tr>       <tr>            <td style="font:14px/1.4285714 Arial,sans-serif;padding:0">             <p style="margin-bottom:0;margin-top:0">The password for <strong>${username}</strong> was changed. If you did not make this change, please email <a href="mailto:support@somosport.com" target="_blank">support@somosport.com</a>.              </p>            </td>       </tr>       <tr>            <td class="m_4445496107839198780spacer" style="font:14px/1.4285714 Arial,sans-serif;padding:10px 0 0"></td>     </tr>       <tr>            <td class="m_4445496107839198780spacer" style="font:14px/1.4285714 Arial,sans-serif;padding:10px 0 0"></td>     </tr>       <tr>            <td style="font:14px/1.4285714 Arial,sans-serif;padding:0">     </tr>       <tr>            <td style="font:14px/1.4285714 Arial,sans-serif;padding:0">             <span>Thanks,</span>            </td>       </tr>       <tr>            <td style="font:14px/1.4285714 Arial,sans-serif;padding:0">             <span>The Somosport Team</span>         </td>       </tr>   </tbody></table>`
                send_email_from(email, 'Password changed!', content );
                // Message(res, 'Success', '0', result);
            }

            //Manage Token
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

            //if result is empty, a 404 will be thrown
            Response(res, result)
        })
        .catch(function(err){
            Response(res, null, err)
          // Message(res, err.detail, err.code, null);
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
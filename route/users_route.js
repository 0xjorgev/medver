/**
 * Created by george on 16/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
var fs = require('fs')
define(['express'
        ,'uuid'
        ,'njwt'
        ,'../model/index'
        ,'../util/password_gen_util'
        ,'../util/knex_util'
        ,'../util/request_message_util'
        ,'../util/email_sender_util'
        ,'../util/md5_gen_util'
        ,'../util/response_message_util'
        ,'../util/logger_util'
        ,'../helpers/auth_helper'
        ],
        function (express
        ,uuid
        ,nJwt
        ,Models
        ,Pwd_gen
        ,Knex_util
        ,Message
        ,Email
        ,Md5
        ,Response
        ,logger
        ,auth){

    var router = express.Router();
    var send_email_from = Email(process.env.SENDER_EMAIL);

    router.post('/login', function (req, res, next) {
        var user_login = req.body;
        var username = user_login.username.trim();
        var password = user_login.password.trim();

        logger.debug(user_login)

        return Models.user.query((qb) => {
            qb.where('username', username)
            qb.orWhere('email', username)
        })
	    .fetch()
        .then(result => {

            if (result !== null
                && result.attributes.password == password
                && result.attributes.active == true){
                var userId = result.id

                var claims = {
                    user: userId,
                    roles: ['admin'],
                    lang: 'en'
                }

                var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
                var jwt = nJwt.create(claims, signingKey)

                //TODO: does not expire, for now
                jwt.setExpiration()
                result.attributes['Authorization-Token'] = jwt.compact()

                //TODO: reemplazar por una busqueda de roles adecuada
                result.attributes.roles = ['admin']
				delete result.attributes.password
                Response(res, result)
            }
            else{
                //cuando el user no existe o bien proveyó el password correcto,
                //se retorna el status http 403 - "Unauthorized"
                Response(res, null, auth.checkPermissions(req._currentUser, ['not-authorized!']))
            }

        })
        .catch(error => Response(res, null, error))
    });

    router.post('/register', function(req, res, next){
        var new_user = req.body;
        var username = new_user.username.trim();
        var password = new_user.password.trim();
        var email    = new_user.email.trim();
        var origin = req.headers.origin

        var _newUser = null

        new Models.user({
            username: username,
            email: email,
            password: password
        })
        .save()
        .then(result => {
            _newUser = result
			return new Models.entity({
				object_id: _newUser.attributes.id
				,object_type: 'users'
			})
			.save()
        })
        .then(result => {

            logger.debug(`Email Value: ${email}`);
            //content is from template/email/registerUser.html
            // var content =  `<td style="padding-left: 21%; color: #000;"><h1>Welcome ${username}</h1><p>To log in just click <a href="${origin}">Login</a> at the top of every page, and then enter your email or username  and password.</p><p class="highlighted-text">Use the following values when prompted to log in:<br/><strong>Username or Email</strong>: ${username} or ${email} <br/></p></td>`
            // var header = '<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0;"><!-- header --><table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table"><tr style="background-color: #00796b; text-align: center;"><td><h5 style="line-height: 5px;text-align: center; font-size: 14px;"><img alt="SomoSport Logo"  href="${origin}" src="http://ss-management-dev.herokuapp.com/img/somosport-brand-small.png"></h5></td></tr><tr style="background-color:#F6F6F6;">'
            // var footer = '</tr><!-- End Content --><tr style="background-color: #00796b;"><td><h5 class="closing-text" style="color: #f6f6f6; line-height: 5px;text-align: center; font-size: 14px;">Thank you, Somosport!</h5></td></tr></table><!-- End wrapper table --></body>'
            // var content_html = header + content + footer
            var content_html = `<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0; text-align: justify;">    <!-- header -->    <table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table"           style="background-color:#F6F6F6; color: #000; font-size:12px">        <tr>            <td width="20%" align="center" >                <img alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png">            </td>            <td width="60%" align="center" >            </td>            <td width="20%" align="right">                <img alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png">            </td>        </tr>        <!-- Content -->        <tr>            <td width="20%" align="center" style>            </td>            <td width="60%" >                <p style="font-size:18px"><b>Bienvenido a Somosport, ${username}.</b></p>                <p style="font-size:18px"><i>Es nuestro placer asistirte en el proceso de registro de tu equipo en las competiciones de Alianza de Futbol <strong>Houston Copa Coca Cola</strong> y en <strong>Ram Copa Alianza</strong></i></p>                <br>                <p>Gracias por darte de alta en Somosport!</p>                <p>Para continuar con el registro de tu equipo en <strong>"Houston Coca Cola"</strong>haz click <a href="http://registroalianza.codefuel.me/#/competition/1">aquí</a> y completa el registro lo antes posible.</p>                <p>Para continuar con el registro de tu equipo en <strong>"RAM Copa Alianza"</strong>haz click <a href="http://registroalianza.codefuel.me/#/competition/2">aquí</a> y completa el registro lo antes posible.</p>                <br>                <p>Gracias!</p>                <p><strong>—- El equipo de Somosport con Alianza</strong></p>            </td>            <td width="20%"  align="right">            </td>        <tr>            <td width="20%" align="left" ></td>             <td width="60%" >             <hr>                <p>Nota: Este correo electrónico fue enviado desde una cuenta que no acepta recepción de correos.</p>                <p>Tu has recibido este correo como parte de nuestro esfuerzo para asistir a Alianza de Futbol con tu solicitud de registrar equipos en sus competiciones. Tome nota por favor que Somosport provee el servicio de registro automático a Alianza de Futbol, y que por lo tanto, al registrar un equipo en una competición de Alianza de Futbol, Ud. también acepta la Política de Privacidad y los términos del servicio de Alianza de Futbol y Somosport.</p>             <p>Alianza de Futbol y Somosport quieren proveerle el mejor servicio posible para sus organizaciones deportivas, y a través de este proceso Ud también tendrá acceso a mas servicios de Somosport.</p>              <br>                <p>© Somosport Inc.</p>            </td>            <td width="20%"  align="right"></td>        </tr>      </table><!-- End wrapper table --></body>`
            send_email_from(email,'Bienvenido a Somosport', content_html)

            var claims = {
                user: _newUser.id,
                roles: ['admin'],
                permissions: [],
                lang: 'en'
            }

            var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
            var jwt = nJwt.create(claims, signingKey)

            //TODO: does not expire, for now
            jwt.setExpiration()

            _newUser.attributes['Authorization-Token'] = jwt.compact()
            delete _newUser.attributes.password

            //TODO: test only!
            _newUser.attributes.roles = ['admin', 'player']
            _newUser.attributes.permissions = ['list', 'create', 'update', 'delete']

            Response(res, _newUser)
        })
        .catch(error => Response(res, null, error));
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
            this.where('username', username_email)
                .orWhere('email', username_email)
        })
        .then((result) => {
            if(result.length == 0){
                //no user/email was found
                Response(res, result)
                return
            }
            else
            {
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

                // var urlresetPassword = origin+'/reset_password/username/'+ username + '/rq_token/' + jwt.compact()
                var urlresetPassword = 'http://ss-competition-live.herokuapp.com/reset_password/username/'+ username + '/rq_token/' + jwt.compact()
                console.log('urlresetPassword', urlresetPassword)
                var content =  `<td valign="top" class="top-content action-content" style="padding-left: 21%"><h1>${username},</h1><p>There was recently a request to change the password for your account.</p><p>You can change your password at any time by logging into <a href="${origin}">your account</a>.</p><p>If you requested this password change, click here to reset your password:</p><table cellspacing="0" cellpadding="0" class="action-button"><tr><td><a href="${urlresetPassword}"><span>Reset Password</span></a></td></tr></table><p>If you did not make this request, you can ignore this message and your password will remain the same.</p></td>`

                var header = '<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0;"><!-- header --><table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table" align="center" class="container-table"><tr style="background-color: #00796b; text-align: center;"><td><h5 style="line-height: 5px;text-align: center; font-size: 14px;"><img alt="SomoSport Logo"  href="${origin}" src="http://ss-management-dev.herokuapp.com/img/somosport-brand-small.png"></h5></td></tr><tr style="background-color:#F6F6F6;">'
                var footer = '</tr><!-- End Content --><tr style="background-color: #00796b;"><td><h5 class="closing-text" style="color: #f6f6f6; line-height: 5px;text-align: center; font-size: 14px;">Thank you, Somosport!</h5></td></tr></table><!-- End wrapper table --></body>'
                var content_html = header + content + footer

                send_email_from(email, 'Reset Password Request', content_html )
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
        var User = new Models.user;

        Knex_util(User.tableName)
        .where('id','=',verifiedJwt.body.user)
        .where('active','=',1)
        .update({
            'password' : user_fgt.password
        }, ['id'])
        .then(result => Response(res, result))
        .catch(error => Response(res, null, error))
    });

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

    router.get('/team', (req, res) => {
        //se verifica unicamente que haya un usuario valido en el request
        //no se requiere ningun permiso especial
        var chk = auth.checkPermissions(req._currentUser, [])

        if(chk.code !== 0){
            Response(res, null, chk)
            return
        }

        Models.user
        .query(qb => qb.where({id: req._currentUser.id}) )
        .fetch({withRelated: [
             'entity.related_from.relationship_type'
            ,'entity.related_from.to.entity_type'
            // ,'entity.related_from.from.entity_type'
        ]})
        .then(result => {
            var user = result.toJSON()

			logger.debug(user)
            //con esto se filtran las relaciones tipo 'coach' y owner
            return user.entity.related_from
                .filter(rel => {
                    var name = (rel.relationship_type.name == undefined) ? '': rel.relationship_type.name.toUpperCase()
                    return name == 'COACH' || name == 'OWNER'
                })
                //y con este map se extraen los ids de los teams
                .map(teams => teams.to.object_id)
        })
        .then(result => {
            return Models.team
                .query(qb => qb.whereIn('id', result))
                .fetchAll({withRelated: ['category_type'
					,'gender'
					,'category_group_phase_team.category.season.competition'
					,'category_group_phase_team.status_type'
				]})
        })
        .then(result => Response(res, result) )
        .catch(error => Response(res, null, error))
    })

    return router;
});

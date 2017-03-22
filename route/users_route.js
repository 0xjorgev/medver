if (typeof define !== 'function')
    var define = require('amdefine')(module);

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
		,'lodash'
		,'fs'
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
		,auth
		,_
		,fs){

	let router = express.Router();
	const send_email_from = Email(process.env.SENDER_EMAIL);

	router.post('/login', function (req, res, next) {
		const user_login = req.body;
		const username = user_login.username.trim();
		const password = user_login.password.trim();

		logger.debug(user_login)

		return Models.user.query(qb => {
			qb.where('username', username)
			qb.orWhere('email', username)
		})
		.fetch({withRelated: [
			'entity.related_from.relationship_type'
			,'entity.related_from.to.entity_type'
			,'entity.related_from.to.object'
		]})
		.then(foundUser => {
			if (foundUser !== null
				&& foundUser.attributes.password == password
				&& foundUser.attributes.active == true){
					const userId = foundUser.id

					let user = foundUser.toJSON()
					user.roles = foundUser.roles()
					delete user.entity

					const claims = {
						user: userId
						,roles: user.roles
						,lang: 'en'
					}

					const signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
					let jwt = nJwt.create(claims, signingKey)

					//TODO: does not expire, for now
					jwt.setExpiration()
					user['Authorization-Token'] = jwt.compact()

					Response(res, user)
				}
				else{
					//cuando el user no existe o si no envió el password correcto,
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
        var lang    = (new_user.lang !== undefined && new_user.lang !== null)? new_user.lang.trim() : "EN";
        var origin = req.headers.origin

        var _newUser = null

        new Models.user({
            username: username,
            email: email,
            password: password,
            lang: lang
        })
        .save()
        .then(result => {
            _newUser = result
			return _newUser
        })
        .then(result => {
            //content is from template/email/registerUser.html
            var content =  `<td style="padding-left: 21%; color: #000;"><h1>Welcome ${username}</h1><p>To log in just click <a href="${origin}">Login</a> at the top of every page, and then enter your email or username  and password.</p><p class="highlighted-text">Use the following values when prompted to log in:<br/><strong>Username or Email</strong>: ${username} or ${email} <br/></p></td>`
            // send_email_from(email,'Welcome to Somosport', content)

            logger.debug(`Sending welcome email to ${email}`);

            var content_html = `<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0; text-align: justify;">    <!-- header -->      <table width="100%" cellpadding="20" cellspacing="0" border="0" id="background-table" align="center" class="container-table"            style="background-color:#F6F6F6; color: #000; font-size:12px">        <tr>            <td style="width:2%" align="center">                            </td>            <td style="width:96%">               <img style="float: left;" alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png">                <img style="float: right;" alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png">            </td>            <td style="width:2%" align="center">            </td>        </tr>     <!-- Content -->                <tr>                        <td style="width:2%">           </td>           <td style="width:96%">                              <p style="font-size:18px"><b>Bienvenido a Somosport, ${username}.</b></p>                               <p style="font-size:18px"><i>Es nuestro placer asistirte en el proceso de registro de tu equipo en las competiciones de Alianza de Futbol <strong>Houston Copa Coca Cola</strong> y en <strong>Ram Copa Alianza</strong></i></p>                                <br>                                <p>Gracias por darte de alta en Somosport!</p>                              <p>Para continuar con el registro de tu equipo en <strong>"Houston Copa Coca Cola"</strong>haz click <a href="http://registroalianza.codefuel.me/#/competition/1">aquí</a> y completa el registro lo antes posible.</p>                             <p>Para continuar con el registro de tu equipo en <strong>"RAM Copa Alianza"</strong>haz click <a href="http://registroalianza.codefuel.me/#/competition/2">aquí</a> y completa el registro lo antes posible.</p>                               <br>                                <p>Gracias!</p>                             <p><strong>— El equipo de Somosport con Alianza</strong></p>                       </td>           <td style="width:2%">           </td>       </tr>        <tr>            <td style="width:2%"></td>             <td style="width:96%">              <hr>                <p>Nota: Este correo electrónico fue enviado desde una cuenta que no acepta recepción de correos.</p>                <p>Tu has recibido este correo como parte de nuestro esfuerzo para asistir a Alianza de Futbol con tu solicitud de registrar equipos en sus competiciones. Tome nota por favor que Somosport provee el servicio de registro automático a Alianza de Futbol, y que por lo tanto, al registrar un equipo en una competición de Alianza de Futbol, Ud. también acepta la Política de Privacidad y los términos del servicio de Alianza de Futbol y Somosport.</p>             <p>Alianza de Futbol y Somosport quieren proveerle el mejor servicio posible para sus organizaciones deportivas, y a través de este proceso Ud también tendrá acceso a mas servicios de Somosport.</p>              <br>                <p>© Somosport Inc.</p>            </td>            <td style="width:2%"></td>        </tr>      </table><!-- End wrapper table --></body>`
            // send_email_from(email,'Bienvenido a Somosport', content_html)

            var claims = {
                user: _newUser.id,
                roles: ['admin'],
                permissions: [],
                lang: lang
            }

            var signingKey = process.env.API_SIGNING_KEY || 's3cr3t'
            var jwt = nJwt.create(claims, signingKey)

            //TODO: does not expire, for now
            jwt.setExpiration()

            _newUser.attributes['Authorization-Token'] = jwt.compact()
            delete _newUser.attributes.password

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

                var content_html =`<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0; text-align: justify;">    <!-- header -->    <table width="100%" cellpadding="20" cellspacing="0" border="0" id="background-table" align="center" class="container-table"           style="background-color:#F6F6F6; color: #000; font-size:12px">        <tr>            <td style="width:2%" align="center">                            </td>            <td style="width:96%">               <img style="float: left;" alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png">                <img style="float: right;" alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png">            </td>            <td style="width:2%" align="center">            </td>        </tr>        <!-- Content -->        <tr>            <td style="width:2%">            </td>            <td style="width:96%">                <p style="font-size:18px"><b>Bienvenido a Somosport, ${username}.</b></p>                <br>                <p>Se a solicitado recientemente un cambio de contraseña para su cuenta.</p>                <p>Si usted a solicitado el cambio, haga clic <strong><a href="${urlresetPassword}">aquí</strong></a>                <p>Si no realizo la solicitud de cambio de contraseña, puede ignorar este correo y si contraseña permencera igual.</p>                <br>                <p>Gracias!</p>                <p><strong>— El equipo de Somosport con Alianza</strong></p>            </td>            <td style="width:2%">            </td>        <tr>            <td style="width:2%"></td>             <td style="width:96%">                <hr>                <p>Nota: Este correo electrónico fue enviado desde una cuenta que no acepta recepción de correos.</p>                <p>Tu has recibido este correo como parte de nuestro esfuerzo para asistir a Alianza de Futbol con tu solicitud de registrar equipos en sus competiciones. Tome nota por favor que Somosport provee el servicio de registro automático a Alianza de Futbol, y que por lo tanto, al registrar un equipo en una competición de Alianza de Futbol, Ud. también acepta la Política de Privacidad y los términos del servicio de Alianza de Futbol y Somosport.</p>             <p>Alianza de Futbol y Somosport quieren proveerle el mejor servicio posible para sus organizaciones deportivas, y a través de este proceso Ud también tendrá acceso a mas servicios de Somosport.</p>              <br>                <p>© Somosport Inc.</p>            </td>            <td style="width:2%"></td>        </tr>      </table><!-- End wrapper table --></body>`
                send_email_from(email, 'Solicitud de cambio de contraseña', content_html )

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
        .then(result => {
            var content_html = `<body style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:12px; margin:0; padding:0; text-align: justify;">    <!-- header -->    <table width="100%" cellpadding="20" cellspacing="0" border="0" id="background-table" align="center" class="container-table"          style="background-color:#F6F6F6; color: #000; font-size:12px">        <tr>            <td style="width:2%" align="center">                            </td>            <td style="width:96%">               <img style="float: left;" alt="SomoSport Logo" src="https://somosport-s3.s3.amazonaws.com/logosomosportcompleto1479494176269.png">                <img style="float: right;" alt="Alianza" src="https://somosport-s3.s3.amazonaws.com/logoalianza1479494219199.png">            </td>            <td style="width:2%" align="center">            </td>        </tr>        <!-- Content -->        <tr>            <td style="width:2%">            </td>            <td style="width:96%">                <p style="font-size:18px"><b>Bienvenido a Somosport, ${username}.</b></p>                <br>                <p>Su contraseña ha sido cambiada exitosamente.</p>                <p>Si usted realizo este cambio, puede ignorar este correo.</p>                <p>Si usted no realizo el cambio de su contraseña, por favor contactenos al                   <a href="mailto:rlopez@somosport.com">rlopez@somosport.com</a>              </p>                <br>                <p>Gracias!</p>                <p><strong>— El equipo de Somosport con Alianza</strong></p>            </td>            <td style="width:2%" >            </td>        <tr>            <td style="width:2%"></td>             <td style="width:96%">                <hr>                <p>Nota: Este correo electrónico fue enviado desde una cuenta que no acepta recepción de correos.</p>                <p>Tu has recibido este correo como parte de nuestro esfuerzo para asistir a Alianza de Futbol con tu solicitud de registrar equipos en sus competiciones. Tome nota por favor que Somosport provee el servicio de registro automático a Alianza de Futbol, y que por lo tanto, al registrar un equipo en una competición de Alianza de Futbol, Ud. también acepta la Política de Privacidad y los términos del servicio de Alianza de Futbol y Somosport.</p>             <p>Alianza de Futbol y Somosport quieren proveerle el mejor servicio posible para sus organizaciones deportivas, y a través de este proceso Ud también tendrá acceso a mas servicios de Somosport.</p>              <br>                <p>© Somosport Inc.</p>            </td>            <td style="width:2%"></td>        </tr>      </table><!-- End wrapper table --></body>`
            send_email_from(email, 'Cambio de contraseña', content_html )
            Response(res, result)
        })
        .catch(error => Response(res, null, error))
    });

    router.get('/',  (req, res) => {
		return Models.user
			.query(qb => {
				qb.where({active: true})
				qb.orderBy('username')
			})
			.fetchAll({withRelated: [
				'entity.related_from.to.object',
				'entity.related_from.relationship_type']})
			.then(result => {
				let users = result.toJSON()
				//getEntities devuelve un objeto user con las entidades
				return users.map(Models.user.getEntities)
			})
			.then(result => Response(res, result) )
			.catch(error => Response(res, null, error) )
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
        ]})
        .then(result => {
            var user = result.toJSON()
            //con esto se filtran las relaciones tipo 'coach' y owner
            return user.entity.related_from
                .filter(rel => {
                    var name = (rel.relationship_type.name == undefined) ? '' : rel.relationship_type.name.toUpperCase()
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

	router.get('/:user_id/feed', (req, res) => {

		const permissionCheck = auth.checkPermissions({
			user: req._currentUser
			,object_type: ''
			,permissions: []
		})

		if (permissionCheck.code != 0){
			Response(res, null, permissionCheck)
			return
		}

		Models.user
		.where({id: req.params.user_id})
		.fetch({withRelated: [
			'entity.related_from.to.object',
			'entity.related_from.relationship_type']})
		.then(user => {
			return Models.user.getEntities(user.toJSON())
		})
		.then(user => {
			// logger.debug(user)
			//ahora con las entidades relacionadas a este user,
			//traigo los feeds asociados a ellas o al mismo usuario
			//se extraen los ids de las entidades
			let ids = null

			if(user.related_entities){
				ids = user.related_entities.filter(rel => {
					return rel.entity_id && rel.entity_id !== null
				})
				.map(rel => rel.entity_id)

				//obtengo las relaciones de las entidades
				return Models.entity_relationship
				.query(qb => {
					qb.whereIn('ent_ref_to_id', ids)
					//filtrar solamente por tipo 3 -> feed item
					qb.where('relationship_type_id', 3)
				})
				.fetchAll({withRelated: ['from.object']})
				.then(rel => {
					//proceso el resultado, para retornar solamente los feeds
					return rel.toJSON().map(r => r.from.object.id)
				})
			}
			else {
				logger.debug('user has no related entities')
				return []
			}
		})
		.then(feedItemIds => {
			// logger.debug(feedItemIds)
			//un arreglo con los ids de los feeds o uno vacio
			if(feedItemIds.length == 0){
				// logger.debug('no feeds')
				return []
			}

			return Models.feed_item.query(qb => {
				qb.whereIn('id', feedItemIds)
				qb.limit('25')
				qb.orderBy('created_at', 'desc')
			})
			.fetchAll()
		})
		.then(result => {
			if(result.length == 0)
				return []

			//aqui se cargan los objetos relacionados al feed item
			return result.load('entity.related_from.to.object')
		})
		//los proceso, para devolver unicamente el objeto
		.then(result => {
			return result.map(_feedItem => {
				let feedItem = _feedItem
				let fi = Object.assign({}, feedItem.toJSON())
				delete fi.entity
				fi.related_entities = []

				if(feedItem.related('entity').related('related_from').isEmpty()){
					return fi
				}

				feedItem.related('entity')
					.related('related_from')
					.forEach((rel, idx) => {
						let object = rel.related('to').related('object')
						let tmpTo = object.toJSON()
						tmpTo.object_type = rel.related('to').get('object_type')
						fi.related_entities.push(tmpTo)
					})
				return fi
			})
		})
		.then(result => Response(res, result))
		.catch(error => Response(res, null, error))
	})

	router.get('/:user_id', (req, res) => {
		Models.user
		.forge({id: req.params.user_id})
		.fetch({withRelated: [
			'entity.related_from.to.object',
			'entity.related_from.relationship_type']})
		.then(result => {
			let user = result.toJSON()
			user.roles = result.roles()
			delete user.entity
			Response(res, user)
		})
		.catch(error => Response(res, null, error))
	})

  //==========================================================================
  //  User Update
  //==========================================================================

  router.put('/language/', (req, res) => {

    var user = new Models.user;
    var prefLang = req.body.lang;
    //console.log("Current User: ", req._currentUser)
    //var chk = auth.checkPermissions(req._currentUser, [])

    if(req._currentUser.id !== 0){
        Response(res, null, 'No user found')
        return
    }

    Knex_util(user.tableName)
    .where({'id':req._currentUser.id})
    .where({'active':1})
    .update({
        'lang' : prefLang
    }, ['id'])
    .then(result => {
        Response(res, result)
    })
    .catch(error => { Response(res, null, error) })
  })

    return router;
});

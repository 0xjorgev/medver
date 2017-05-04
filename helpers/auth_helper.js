if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['../node_modules/lodash/lodash.min'
	,'../util/logger_util'
	,'njwt'
	,'../model/index'
	,'../util/response_message_util'
	],( _
		,logger
		,nJwt
		,Models
		,Response
	) => {

	let authHelper = {}

	authHelper.checkPermissions = (options) => {

		if(!options) return false

		//user que viene en el token
		const user = options.user
		//tipo de objeto a verificar. Se utiliza el table_name de los modelos: competitions, users, etc
		const objectType = options.object_type
		//id del objeto con el que se va a interactuar. Se utiliza el id del modelo; NO el de entidad
		const objectId = options.object_id
		//los roles que tienen permiso de interactuar con el objeto: owner, player, admin
		const permissions = options.permissions

		//es necesario verificar si el usuario tiene el permiso necesario sobre
		//el tipo de objeto
		let hasPermission = null

		if(permissions.length == 0 || objectType == ''){
			//si no se requieren permisos, se permite ejecutar la operación
			hasPermission = true
		}
		else {
			//Si se requieren permisos, se hace la verificación
			hasPermission = permissions.reduce((hasPermission, role) => {
				if(user.roles[role]){
					let userPermissions = user.roles[role][objectType]
					//necesito extraer los ids de la combinacion tipo/rol
					if(userPermissions){
						//si el user tiene los permisos, entonces entre el id de este
						//objeto los del usuario;
						hasPermission = hasPermission
						|| userPermissions.filter(id => objectId == id).length > 0
					}
				}
				return hasPermission
			}, false)
		}

		if(hasPermission)
			return {code: 0,  message: 'OK'}

		// if no user was found or the user doesn't have permissions
		return {code: 403,
			name: 'InsufficientPermissionsError',
			message: 'Insufficient permissions to access this resource'}
	}

	authHelper.validateToken = (req, res, next) => {
		const token = req.headers['Authorization-Token'] || req.headers['authorization-token']
		if(token === undefined || token === null){
			next()
		}
		else{
			try{
				var secretKey = process.env.API_SIGNING_KEY || 's3cr3t'
				var verifiedJwt = nJwt.verify(token, secretKey)

				//TODO: hay que buscar aqui los roles de usuario
				//si se entrega un token válido, se inyectan los datos del usuario al request
				//estos valores se obtienen al hacer login
				req._currentUser = {
					id: verifiedJwt.body.user,
					roles: verifiedJwt.body.roles,
					lang: verifiedJwt.body.lang
				}

				next()
			}
			catch(error){
				logger.error(error)
				Response(res, null, error)
			}
		}
	}

	return authHelper
})

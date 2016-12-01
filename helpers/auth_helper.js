if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../node_modules/lodash/lodash.min'
	,'../util/logger_util'],
	(_, logger) => {

	var authHelper = {}

	authHelper.checkPermissions = (user, permissions) => {

		// permissions = (typeof permissions == Array) ? permissions : [permissions]
		// logger.debug('user.roles')
		// logger.debug(user.roles[0])
		// logger.debug('permissions required')
		// logger.debug(permissions)

		if(user){
			var hasPermission = user.roles.reduce((flag, p) => {
				return flag || _.includes(permissions, p)
			}, false)

			//en caso de que no se requieran permisos, se aprueba
			hasPermission = hasPermission || (permissions.length == 0)

			if(hasPermission)
				return {code: 0,  message: 'OK'}
		}

		// if no user was found or the user doesn't have permissions
		return {code: 403,
			name: 'InsufficientPermissionsError',
			message: 'Insufficient permissions to access this resource'}
	}

	return authHelper
})

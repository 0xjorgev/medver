if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../node_modules/lodash/lodash.min', '../util/request_message_util'], function(_, Message){

	var authHelper = {}

	authHelper.checkPermissions = (user, permissions) => {

		// permissions = (typeof permissions == Array) ? permissions : [permissions]

		console.log('user.roles > ', user.roles[0], 'permissions required >', permissions)

		console.log(_.includes(permissions, user.roles ))

		var hasPermission = user.roles.reduce((flag, p) => {
			return flag || _.includes(permissions, p)
		}, false)

		console.log('has permissions', hasPermission)

		if(user && hasPermission ){
			return {code: 0,  message: 'OK'}
		}
		else {
			return {code: 403,
				name: 'InsufficientPermissionsError',
				message: 'Insufficient permissions to access this resource'}
		}
	}

	return authHelper
})

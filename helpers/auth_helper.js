if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../node_modules/lodash/lodash.min', '../util/request_message_util'], function(_, Message){

	var authHelper = {}

	authHelper.checkPermissions = (user, permissions) => {

		// permissions = (typeof permissions == Array) ? permissions : [permissions]

		// console.log('user.roles > ', user.roles[0], 'permissions required >', permissions)

		if(user){
			var hasPermission = user.roles.reduce((flag, p) => {
				return flag || _.includes(permissions, p)
			}, false)

			if(hasPermission){
				return {code: 0,  message: 'OK'}
			}
		}

		//if no user was found or the user doesn't have permissions
		return {code: 403,
			name: 'InsufficientPermissionsError',
			message: 'Insufficient permissions to access this resource'}


	}

	return authHelper
})

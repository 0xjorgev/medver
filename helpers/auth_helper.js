if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['../node_modules/lodash/lodash.min', '../util/request_message_util'], function(_, Message){

	var authHelper = {}

	authHelper.checkPermissions = (user, permissions) => {

		permissions = (typeof permissions == Array) ? permissions : [permissions]

		if(user && _.includes(user.roles, permissions)){
			return {code: 403,  message: 'Insufficient privileges to access this resource'}
		}
		else {
			return {code: 0,  message: 'OK'}
		}
	}

	return authHelper
})

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', 'util'], function (express, util) {

	var inspect = util.inspect
	//log helper function
	var _log = (obj) => console.log(inspect(obj, {colors: true, depth: Infinity }))

	// List of HTTP codes and their uses
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	var message =  function(res, result, error){

		var code = 200
		var mess = 'Undefined response message'

		//checks if it's a validation failure message
		if(error) {
			// _log(error)
			//Identify the validation errors thrown by CheckIt
			error.name = (error.name == 'Error' && error.message && error.message.includes('invalid values')) ? 'ValidationError' : error.name

			switch(error.name){
				case 'JwtParseError':
					code = 403
					mess = error.userMessage
					break
				case 'ValidationError':
					code = 400
					mess = error.name ? `(${error.name}) ` : ''
					mess += error.message

					result = error.keys().reduce((errors, field) => {
						errors[field] = error.errors[field].errors
						return errors
					}, {})

					break
				default:
					code = 500
					mess = ''
					mess += error.code ? `[${error.code}] - ` : ''
					mess += error.name ? `(${error.name}) ` : ''
					mess += error.details ? ` - ${error.details} - ` : ''
					mess += error.message
			}
		}
		else{
			// console.log('--------------------------------------------------------')
			// console.log('typeof', typeof result)
			// console.log('is object?', typeof result == Object)
			// if(result && result.length) console.log('length', result.length)
			// _log(result)
			// console.log('--------------------------------------------------------')

			//if it's not an error, but the response is empty, then it's a 404 error
			//if the response is an array, checks it's size. If it's greater than 0, then is a valid response
			code = (result && ((result && result.length && result.length > 0) || result.attributes )) ? 200 : 404
		}

		switch(code){
			case 200:
				res.status(code).json({ message: 'Success', code: '0', data: result})
				break
			case 400:
				res.status(code).json({ message: 'Validation failure', code: code, validation_errors: result})
				break
			case 403:
				res.status(code).json({ message: 'Unauthorized', code: code})
				break
			case 404:
				res.status(code).json({ message: 'Resource not found', code: code})
				break
			case 500:
				var msg = { message: 'Server error: ' + mess , code: code }
				if(!process.env.NODE_ENV || process.env.NODE_ENV != 'production' || process.env.LOG_LEVEL == 'debug'){
					//if we're not in production, show stack trace
					msg.error_stack = error.stack
				}
				res.status(code).json(msg)
				break
			default:
				console.log('code', code, 'message', mess)
				if(result) _log(result)
				if(error) _log(error.stack)
				res.status(500).json({ message: 'Unhandled error: ' + mess, code: 500, data: result, error: error});
		}
    }

    return message;
});

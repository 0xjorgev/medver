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
		console.log('message builder', 'result', result, 'error', error)

		if(error) {
			if(error.stack.includes('Checkit Errors')){
				code =  400
				mess = 'Validation failure'

				//overwriting obj, just in case
				obj = error.keys().reduce((errors, field) => {
					errors[field] = error.errors[field].errors
					return errors
				}, {})
			}
			else{
				code = 500
				//DB errors returns the message on error.message. There might be other keys in use, like error.detail
				// mess = error.message ? error.message : error.detail
				mess = `code: [${error.code}] - message: (${error.name}) ${error.message}`
			}
			_log(error)
		}


		switch(code){
			case 200:
				res.status(code).json({ message: 'Success', code: '0', data: result});
				break;
			case 400:
				res.status(code).json({ message: 'Validation failure', code: code, validation_errors: result});
				break;
			case 403:
				res.status(code).json({ message: 'Unauthorized', code: code});
				break;
			case 404:
				res.status(code).json({ message: 'Resource not found', code: code, data: result});
				break;
			case 500:
				res.status(code).json({ message: 'General error: ' + mess , code: code});
				break;
			default:
				console.log('code', code, 'message', mess)
				res.status(500).json({ message: mess, code: 500, data: obj});
		}
    }

    return message;
});

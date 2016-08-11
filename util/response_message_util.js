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

		var code = 500
		var mess = 'Response'

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
			}

			console.log('---------------------------------------------------------------')
			// console.log(error.stack)
			// console.log(error)
			_log(error)
		}

		switch(code){
			case 200:
				res.status(code).json({ message: 'Success', code: '0', data: result});
				break;
			case 400:
				//bad request: the server wont process the request due to something perceived as a client error
				res.status(code).json({ message: 'Validation failure', code: code, validation_errors: result});
				break;
			case 403:
				res.status(code).json({ message: 'Unauthorized', code: code});
				break;
			case 404:
				res.status(code).json({ message: 'Resource not found', code: code, data: result});
				break;
			case 500:
				res.status(code).json({ message: 'General error' + error.detail , code: code, data: result});
				break;
			default:
				console.log('code', code, 'message', mess)
				res.status(code).json({ message: mess, code: code, data: obj});
		}
    }

    return message;
});

/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'], function (express) {

	// List of HTTP codes and their uses
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	var message =  function(res, mess, code, obj, error){

		code = code == '0' ? 200 : code

		//checks if it's a validation failure message
		// console.log('message builder',error)

		if(error) {
			code =  400
			mess = 'Business rules validation failure. Check data for details'
			//overwriting obj, just in case
            obj = error.keys().reduce((errors, field) => {
                errors[field] = error.errors[field].errors
                return errors
            }, {})
		}

		switch(code){
			case 200:
				res.status(code).json({ message: mess, code: '0', data: obj});
				break;
			case 400:
				//bad request: the server wont process the request due to something perceived as a client error
				res.status(code).json({ message: 'Bad request: ' + mess, code: code, validation_errors: obj});
				break;
			case 403:
				res.status(code).json({ message: 'Unauthorized: ' + mess, code: code});
				break;
			case 404:
				res.status(code).json({ message: 'Resource not found', code: code, data: obj});
				break;
			case 500:
				res.status(code).json({ message: 'General error: ' + mess, code: code, data: obj});
				break;
			default:
				console.log('code', code, 'message', mess)
				res.status(code).json({ message: mess, code: code, data: obj});
		}
    }

    return message;
});

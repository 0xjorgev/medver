/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'], function (express) {

	var message =  function(res, mess, code, obj){
		// var array = Array.isArray(obj)
		// var isUndefined = (typeof obj != 'undefined')
		// var isEmpty = (obj === null)
		// // console.log(`isArray: ${array} isUndefined: ${isUndefined} isEmpty: ${isEmpty}`);
		// if ( (array && obj.length > 0) || (isUndefined && !isEmpty)  ) {
		// 	//200 Ok
		// 	// console.log('Success Response');
  		//res.json({message:mess, code: code, data:obj});
		// } else {
		// 	//empty array??
		// 	// console.log('Failure');
		// 	res.status(404);
		// 	res.json({message:'Resource not found',code: 404, data:obj});
		// }

		// Lista de codigos HTTP y sus usos
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
		code = code == '0' ? 200 : code

		switch(code){
			case 200:
				res.status(code).json({ message: mess, code: '0', data: obj});
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

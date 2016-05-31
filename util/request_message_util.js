/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'], function (express) {
	var message =  function(res, mess, code, obj){

		var array = Array.isArray(obj)
		var isUndefined = (typeof obj != 'undefined')
		var isEmpty = (obj === null)

		// console.log(`isArray: ${array} isUndefined: ${isUndefined} isEmpty: ${isEmpty}`);
		if ( (array && obj.length > 0) || (isUndefined && !isEmpty)  ) {
			//200 Ok
			// console.log('Success Response');
        	res.json({message:mess,code: code, data:obj});
		} else {
			//empty array??
			// console.log('Failure');
			res.status(404);
			res.json({message:'Resource not found',code: 404, data:obj});
		}
    }
    return message;
});
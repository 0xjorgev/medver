/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'], function (express) {
	var message =  function(res, mess, code, obj){
        res.json({message:mess,code: code, object:obj});
    }
    return message;
});
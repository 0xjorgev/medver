/**
 * Created by george on 23/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['md5'], function (MD5) {
	var md5_gen = function(message){
		return MD5(message);
	};
    return md5_gen;
});
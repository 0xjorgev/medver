if (typeof define !== 'function')
	var define = require('amdefine')(module);

	define(['./base_model'], function (DB) {

	    var Term_Condition = DB.Model.extend({
	        tableName: 'terms_conditions',
	        hasTimestamps: true,

	    });

	    // uses Registry plugin
	    return DB.model('Term_Condition', Term_Condition);
	});

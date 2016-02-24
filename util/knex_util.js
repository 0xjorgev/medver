/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['knex','../knexfile'], function (Knex, dbConfig) {

	var knex_util;

	if (process.env.NODE_ENV === 'development'){
		knex_util = new Knex(dbConfig.development);
	} else {
		knex_util = new Knex(dbConfig.production);
	}

    return knex_util;
});
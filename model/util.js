/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['knex','../knexfile'], function (Knex, dbConfig) {

	var dbutil;

	if (process.env.NODE_ENV === 'development'){
		dbutil = new Knex(dbConfig.development);
	} else {
		dbutil = new Knex(dbConfig.production);
	}
    // var bookshelf = new Bookshelf(new Knex(dbConfig.development));
    // enable Bookshelf plugins
    //dbutil.plugin('registry');
    /*bookshelf.plugin('virtuals');
    bookshelf.plugin('visibility');*/
    return dbutil;
});
/**
 * Created by george on 17/02/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['knex', 'bookshelf', '../knexfile', 'checkit'], function (Knex, Bookshelf, dbConfig, CheckIt) {

	var bookshelf;

	if (process.env.NODE_ENV === 'development'){
		bookshelf = new Bookshelf(new Knex(dbConfig.development));
	} else {
		bookshelf = new Bookshelf(new Knex(dbConfig.production));
	}

    // enable Bookshelf plugins
    bookshelf.plugin('registry');

    /*
    bookshelf.plugin('virtuals');
    bookshelf.plugin('visibility');
    */

    bookshelf.checkit = CheckIt

    return bookshelf;
});
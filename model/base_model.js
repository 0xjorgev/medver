if (typeof define !== 'function')
    var define = require('amdefine')(module);

define(['knex'
	, 'bookshelf'
	, '../knexfile'
	, 'checkit']
	, function (Knex
		, Bookshelf
		, dbConfig
		, CheckIt) {

	const config = process.env.NODE_ENV === 'development' ? dbConfig.development : dbConfig.production

	let bookshelf = new Bookshelf(new Knex(config))

	//docs de los plugins de bookshelf
	//https://github.com/tgriesser/bookshelf/wiki/Extensions%2C-plugins%2C-resources

	//para cargar referencias a los modelos y evitar referencias circulares
	bookshelf.plugin('registry');
	//se utiliza para generar campos que no están en el esquema
	bookshelf.plugin('virtuals');
	//para ocultar por defecto algunos campos, por ejemplo, el password del user
	bookshelf.plugin('visibility');

	bookshelf.checkit = CheckIt

	return bookshelf;
});

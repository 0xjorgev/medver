
exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('genders', function(table){
			table.increments('id');
			table.string('name');
			table.string('image_url');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('genders') ]);
};
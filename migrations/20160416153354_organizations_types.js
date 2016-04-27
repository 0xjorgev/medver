
exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('organizations_types', function(table){
			table.increments('id');
			table.string('name').notNullable().unique();
			table.text('description');
			table.boolean('active').notNullable().defaultTo(true);
			// table.integer('contact_id').references('contacts.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);

};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('organizations_types') ]);
};
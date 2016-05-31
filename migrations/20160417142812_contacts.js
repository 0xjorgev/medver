
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('contacts', function(table){
			table.increments('id').primary();
			table.string('country');
			table.string('state');
			table.string('city');
			table.integer('zip_code');
			table.string('phone');
			table.string('email');
			table.string('website_url');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('organization_id').references('organizations.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('contacts') ]);
};
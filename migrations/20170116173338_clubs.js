
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('clubs', function(table){
			table.increments('id').primary();
			table.string('name');
			table.string('short_name');
			table.string('logo_url');
			table.string('portrait_url');
			table.text('description');
			table.integer('organization_id').references('organizations.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('clubs')
	])
};

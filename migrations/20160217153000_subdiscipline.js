exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('subdisciplines', function(table){
			table.increments('id').primary();
			table.string('name').notNullable();
			table.text('description').notNullable();
			table.text('image_url');
			table.integer('discipline_id').references('disciplines.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('subdisciplines') ]);
};
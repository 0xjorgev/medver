
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('terms_conditions', function(table){
			table.increments('id').primary();
			table.integer('user_id').references('users.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('terms_conditions')
  ])
};


exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.schema.createTable('categories_pre_registrations', function(table){
			table.increments('id').primary();
			table.integer('category_id').references('categories.id').index();
      		table.integer('team_id').references('teams.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.boolean('payment').defaultTo('false')
			table.boolean('roster').defaultTo('false')
			table.boolean('document').defaultTo('false')
			table.integer('status_id').references('status_types.id').index()
			table.integer('created_by').references('users.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.dropTableIfExists('categories_pre_registrations')
	])
};

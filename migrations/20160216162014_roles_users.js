
exports.up = function(knex, Promise) {
      return Promise.all([
		knex.schema.createTable('roles_users', function(table){
			table.integer('rol_id').references('roles.id').index();
			table.integer('users_id').references('users.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('roles_users') ]);
};

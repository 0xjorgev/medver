
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('users', function(table){
			table.increments('id');
			table.string('username').notNullable().unique();
			table.string('email').notNullable().unique();
			table.string('password').notNullable();
			table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.then(function(){
				//Add query
                return knex.raw('');
            })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('users') ]);
};

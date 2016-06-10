
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('competitions_users', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());

			//relations:
			table.integer('competition_id').references('competitions.id').index();
			table.integer('user_id').references('users.id').index();
		})
		.then(function(){
				//Add query
                return knex.raw('');
            })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('competitions_users') ]);
};
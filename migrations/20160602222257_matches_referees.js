
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('matches_referees', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			table.integer('referee_id').references('users.id').index();
			table.integer('match_id').references('matches.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('matches_referees') ]);
};
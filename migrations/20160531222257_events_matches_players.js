
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('events_matches_players', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			table.integer('player_in').references('players.id').index();
			table.integer('player_out').references('players.id').index();
			table.integer('match_id').references('matches.id').index();
			table.integer('event_id').references('events.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('events_matches_players') ]);
};

exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('matches_teams_players', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.integer('number');
      table.string('position');
			//Relationships
			table.integer('team_id').references('teams.id').index();
			table.integer('player_id').references('players.id').index();
      table.integer('match_id').references('matches.id').index();

		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('matches_teams_players') ]);
};

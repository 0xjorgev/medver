
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('players_teams', function(table){
			table.increments('id');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			table.integer('player_id').references('players.id').index();
			table.integer('team_id').references('teams.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('players_teams') ]);
};
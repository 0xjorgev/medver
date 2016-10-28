
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('players_teams', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			//Fixed related data
			table.integer('number');
			table.string('position');
			table.date('registered_at');
			table.date('unregistered_at');
			//Relationships
			table.integer('player_id').references('players.id').index();
			table.integer('team_id').references('teams.id').index();
			table.integer('position_id').references('positions.id').index();
			//Audit Log
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('players_teams') ]);
};

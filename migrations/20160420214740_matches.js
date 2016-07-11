
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('matches', function(table){
			table.increments('id').primary();
			table.text('location');
			table.integer('number');
			table.integer('home_team_id').references('teams.id').index();
      		table.integer('home_team_score');
			table.integer('visitor_team_id').references('teams.id').index();
      		table.integer('visitor_team_score');
			table.integer('round_id').references('rounds.id').index();
      table.boolean('played').notNullable().defaultTo(false);
			table.timestamp('date');
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
  return Promise.all([ knex.schema.dropTableIfExists('matches') ]);
};

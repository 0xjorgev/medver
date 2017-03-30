exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('matches_players', function(table){
			table.increments('id').primary()
      		table.integer('number')
      		table.string('position')
			table.integer('team_player_id')
			table.boolean('is_initial').notNullable().defaultTo(true)
			table.boolean('active').notNullable().defaultTo(true)
			//Relationships
      		table.integer('match_id').references('matches.id').index()
      		//
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
}

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('matches_players') ]);
}

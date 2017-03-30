exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('categories_players', function(table){
			table.increments('id').primary()
			table.integer('number')
			table.string('position')
			table.boolean('present_in_field').defaultsTo(false)
			table.integer('team_player_id')
			//Relationships
			table.integer('category_id').references('categories.id').index();
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('categories_players')]);
};

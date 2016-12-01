exports.up = function(knex, Promise) {
	return knex.schema.alterTable('categories_teams_players', table => {
		table.dropColumn('number')
		table.dropColumn('position')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.alterTable('categories_teams_players', table => {
		table.integer('number')
		table.string('position')
	})
};

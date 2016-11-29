
exports.up = function(knex, Promise) {
	return knex.schema.alterTable('categories_teams_players', table => {
		table.boolean('present_in_field').defaultsTo(false)
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.alterTable('categories_teams_players', table => {
		table.dropColumn('present_in_field')
	})
}

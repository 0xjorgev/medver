
exports.up = function(knex, Promise) {
	return knex.schema.alterTable('categories_groups_phases_teams', (table) => {
		table.integer('position_in_group')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.alterTable('categories_groups_phases_teams', (table) => {
		table.dropColumn('position_in_group')
	})
}

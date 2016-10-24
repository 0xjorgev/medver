exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('standing_tables', (table) => {
			table.integer('team_id')
			table.integer('category_id')
			table.integer('phase_id')
			table.integer('group_id')
			table.integer('points')
			table.integer('goals_in_favor')
			table.integer('goals_against')
			table.integer('matches_count')
			table.integer('matches_won')
			table.integer('matches_lost')
			table.integer('matches_draw')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('standing_tables', (table) => {
			table.dropColumn('team_id')
			table.dropColumn('category_id')
			table.dropColumn('phase_id')
			table.dropColumn('group_id')
			table.dropColumn('points')
			table.dropColumn('goals_in_favor')
			table.dropColumn('goals_against')
			table.dropColumn('matches_count')
			table.dropColumn('matches_won')
			table.dropColumn('matches_lost')
			table.dropColumn('matches_draw')
		})
	])
};

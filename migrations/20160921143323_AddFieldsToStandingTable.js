exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.integer('team_id')
			table.integer('category_id')
			table.integer('phase_id')
			table.integer('group_id')
			table.integer('points')
			table.integer('goals_in_favor')
			table.integer('goals_against')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.dropColumn('team_id')
			table.dropColumn('category_id')
			table.dropColumn('phase_id')
			table.dropColumn('group_id')
			table.dropColumn('points')
			table.dropColumn('goals_in_favor')
			table.dropColumn('goals_against')
		})
	])
};

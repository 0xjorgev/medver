
//y asi fue como empezo el fin del mundo
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.integer('placeholder_home_team_group')
			table.integer('placeholder_home_team_position')
			table.integer('placeholder_visitor_team_group')
			table.integer('placeholder_visitor_team_position')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.dropColumn('placeholder_home_team_group')
			table.dropColumn('placeholder_home_team_position')
			table.dropColumn('placeholder_visitor_team_group')
			table.dropColumn('placeholder_visitor_team_position')
		})
	])
};

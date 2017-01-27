
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches_teams_players', (table) => {
			table.boolean('is_initial').defaultTo(false)
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches_teams_players', (table) => {
      table.dropColum('is_initial')
		})
	])
};

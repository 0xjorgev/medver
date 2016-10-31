
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('categories', (table) => {
			table.integer('player_maximum_summoned')
			table.integer('player_minimum_summoned')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('categories', (table) => {
			table.dropColumn('player_maximum_summoned')
			table.dropColumn('player_minimum_summoned')
		})
	])
};

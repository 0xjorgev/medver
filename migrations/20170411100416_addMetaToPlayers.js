
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.string('meta')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.dropColumn('meta')
		})
	])
};

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.integer('group_id')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.dropColumn('group_id')
		})
	])
};


exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.integer('created_by_id').references('users.id')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.dropColumn('created_by_id')
		})
	])
};

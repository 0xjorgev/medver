
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('status_types', table => {
			table.string('code')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('status_types', table => {
			table.dropColumn('code')
		})
	])
};

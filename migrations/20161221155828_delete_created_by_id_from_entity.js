
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities_relationships', (table) => {
			table.dropColumn('created_by')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities_relationships', (table) => {
			table.integer('created_by')
		})
	])
};

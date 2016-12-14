
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities', (table) => {
			table.dropColumn('entity_type_id')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities', (table) => {
			table.integer('entity_type_id')
		})
	])
};

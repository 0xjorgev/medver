
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('entities_requests', (table) => {
			table.integer('status_id').references('status_types.id').index()
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities_requests', (table) => {
			table.dropColumn('status_id')
		})
	])
};
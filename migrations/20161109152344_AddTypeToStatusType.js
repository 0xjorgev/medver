
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('status_types', table => {
			table.string('type')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('status_types', table => {
			table.dropColumn('type')
		})
	])
};

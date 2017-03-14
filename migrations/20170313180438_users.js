
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('users', (table) => {
			table.text('lang')
		})
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('users', (table) => {
			table.dropColumn('lang')
		})
	])
};

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities', table => {
			table.string('object_type')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities', table => {
			table.dropColumn('object_type')
		})
	])
};

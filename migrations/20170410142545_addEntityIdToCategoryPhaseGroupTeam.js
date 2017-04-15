
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('categories_groups_phases_teams', (table) => {
			table.integer('entity_id').references('entities.id').index();
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('categories_groups_phases_teams', (table) => {
			table.dropColumn('entity_id')
		})
	])
};

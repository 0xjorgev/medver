
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities_relationships', (table) => {
			table.renameColumn('relationship_type', 'relationship_type_id' )
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('entities_relationships', (table) => {
			table.renameColumn('relationship_type_id', 'relationship_type' )
		})
	])
};

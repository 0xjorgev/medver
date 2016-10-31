
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('entities_relationships', function(table){
			table.increments('id').primary();
			table.integer('ent_ref_from_id');
			table.integer('relationship_type').references('relationships_types.id').index();
			table.integer('ent_ref_to_id');
			table.text('comment');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('created_by').references('users.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('entities_relationships')
	])
};

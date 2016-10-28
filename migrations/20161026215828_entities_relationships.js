
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('entity_relationships', function(table){
			table.increments('id').primary();
			table.integer('ent_ref_from_id');
			table.integer('relationship_type').references('relationship_types.id').index();
			table.integer('ent_ref_to_id');
			table.text('comment');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('created_by').references('users.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			/*
			id
			ent_id (entidad asociar a)
			Relation_type_id
			ent2_id (entidad a asociar)
			active
			comment
			created_by
			updated_by
			created_at
			updated_at
			*/
			//Relationships
			// table.integer('team_id').references('teams.id').index();
			// table.integer('category_id').references('categories.id').index();
			// table.integer('group_id').references('groups.id').index();
			// table.integer('phase_id').references('phases.id').index();
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('entity_relationships')
	])
};


exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('relationships_types', function(table){
			table.increments('id').primary();
			table.text('name');
			table.text('description');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			// table.integer('team_id').references('teams.id').index();
			// table.integer('category_id').references('categories.id').index();
			// table.integer('group_id').references('groups.id').index();
			// table.integer('phase_id').references('phases.id').index();
		})
	])
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('relationships_types')
	])
};

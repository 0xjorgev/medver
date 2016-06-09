
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('categories_groups_phases_teams', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			table.integer('team_id').references('teams.id').index();
			table.integer('category_id').references('categories.id').index();
			table.integer('group_id').references('groups.id').index();
			table.integer('phase_id').references('phases.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('categories_groups_phases_teams') ]);
};
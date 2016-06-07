
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('phases', function(table){
			table.increments('id').primary();
			table.string('name');
			table.integer('position');
			table.integer('participant_team');
			table.integer('classified_team');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('category_season_id').references('categories_seasons.id').index();
			// table.integer('previous').references('phases.id').index();
			// table.integer('next').references('phases.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('phases') ]);
};
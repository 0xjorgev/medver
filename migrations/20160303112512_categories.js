exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('categories', function(table){
			table.increments('id').primary();
			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
			table.string('image_url');
			table.timestamp('inscription_init_at');
			table.timestamp('inscription_ends_at');

			//New Updates, Team participation req
			table.integer('other_minimum_participant').defaultTo(0);
			table.integer('other_maximum_participant').defaultTo(0);
			table.integer('player_minimum_participant').defaultTo(0);
			table.integer('player_maximum_participant').defaultTo(0);
			table.integer('coach_minimum_participant').defaultTo(0);
			table.integer('coach_maximum_participant').defaultTo(0);
			table.integer('team_quantity').defaultTo(0);
			//?
			table.integer('participant_minimum');
			table.integer('participant_maximum');

			table.integer('gender_id').references('genders.id').index();
			table.integer('season_id').references('seasons.id').index();
			table.integer('category_type_id').references('categories_types.id').index();
			table.integer('classification_type_id').references('classifications_types.id').index();

			table.boolean('is_published').notNullable().defaultTo(false);

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('categories') ]);
};
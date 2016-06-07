exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('categories_seasons', function(table){
			table.increments('id').primary();
			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
			table.string('image_url');
			table.timestamp('inscription_init_at');
			table.timestamp('inscription_ends_at');

			//New Updates, Team participation req
			table.integer('other_minimum_participant');
			table.integer('other_maximum_participant');
			table.integer('player_minimum_participant');
			table.integer('player_maximum_participant');
			table.integer('coach_minimum_participant');
			table.integer('coach_maximum_participant');
			//?
			table.timestamp('paticipant_init_date_range');
			table.timestamp('paticipant_end_date_range');

			table.integer('gender_id').references('genders.id').index();
			table.integer('season_id').references('seasons.id').index();
			table.integer('category_id').references('categories.id').index();
			table.integer('clasification_type_id').references('clasifications_types.id').index();

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('categories_seasons') ]);
};
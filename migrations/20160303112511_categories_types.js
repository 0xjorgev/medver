exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('categories_types', function(table){
			table.increments('id').primary();
			table.string('name');
			table.text('description');
			table.boolean('active').notNullable().defaultTo(true);
			table.string('image_url');
			// table.timestamp('inscription_init_at');
			// table.timestamp('inscription_ends_at');
			//Conditions
			// table.string('condition');
			table.integer('minimum_value');
			table.integer('maximum_value');
			//New Updates, Team participation req
			// table.integer('other_minimum_participant');
			// table.integer('other_maximum_participant');
			// table.integer('player_minimum_participant');
			// table.integer('player_maximum_participant');
			// table.integer('coach_minimum_participant');
			// table.integer('coach_maximum_participant');
			// table.timestamp('paticipant_init_date_range');
			// table.timestamp('paticipant_end_date_range');
			// table.integer('gender_id').references('genders.id').index();
			// table.integer('season_id').references('seasons.id').index();
			// table.integer('clasification_id').references('clasifications_type.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('categories_types') ]);
};
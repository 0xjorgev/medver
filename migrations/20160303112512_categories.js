exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('categories', function(table){
			table.increments('id');
			table.string('name');
			table.text('description');
			table.boolean('active').notNullable().defaultTo(true);
			table.string('image_url');
			table.timestamp('inscription_init_at');
			table.timestamp('inscription_ends_at');
			table.string('condition');
			table.integer('minimun_value');
			table.integer('maximun_value');
			// table.timestamp('paticipant_init_date_range');
			// table.timestamp('paticipant_end_date_range');
			table.integer('gender_id').references('genders.id').index();
			table.integer('season_id').references('seasons.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('categories') ]);
};
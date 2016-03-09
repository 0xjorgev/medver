
exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('seasons', function(table){
			table.increments('id');
			table.string('name').notNullable();
			table.string('description');
			table.string('game_title');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('init_at');
			table.timestamp('ends_at');
			table.integer('competition_id').references('competitions.id').index();
			// table.integer('category_id').references('categories.id').index();
			// table.integer('gender_id').references('genders.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('seasons') ]);
};
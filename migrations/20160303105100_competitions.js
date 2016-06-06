
exports.up = function(knex, Promise) {

	return Promise.all([
		knex.schema.createTable('competitions', function(table){
			table.increments('id').primary();
			table.string('name');
			table.text('description');
			table.string('img_url');
			table.boolean('is_published').defaultTo(false);
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('discipline_id').references('disciplines.id').index();
			table.integer('subdiscipline_id').references('subdisciplines.id').index();
			table.integer('competition_type_id').references('competitions_types.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('competitions') ]);
};

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('positions', function(table){
			table.increments('id').primary();
			table.integer('subdiscipline_id').references('subdisciplines.id').index();
			table.string('name_en');
			table.string('short_name_en');
			table.string('name_es');
			table.string('short_name_es');
			table.boolean('active').notNullable().defaultTo(true);

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
  
};

exports.down = function(knex, Promise) {
 	return Promise.all([ knex.schema.dropTableIfExists('positions') ]);
  
};

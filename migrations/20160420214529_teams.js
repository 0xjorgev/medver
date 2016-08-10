
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('teams', function(table){
			table.increments('id').primary();
			table.string('name');
			table.string('logo_url');
			table.string('short_name');
			table.text('description');
			//Category_id or Category_type???????
			table.integer('category_type_id').references('categories_types.id').index();
			table.integer('organization_id').references('organizations.id').index();
			table.integer('subdiscipline_id').references('subdisciplines.id').index();
			table.integer('gender_id').references('genders.id').index();
			table.boolean('active').notNullable().defaultTo(true);
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
  return Promise.all([ knex.schema.dropTableIfExists('teams') ]);
};

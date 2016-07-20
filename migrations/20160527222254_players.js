
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('players', function(table){
			table.increments('id').primary();
			table.string('first_name');
			table.string('last_name');
			table.string('img_url');
			table.string('portrait_url');
			table.string('nickname');
			table.date('birthday');
			table.integer('status_id').notNullable().defaultTo(1);
			table.string('email');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());

			//Relationships
			table.integer('gender_id').references('genders.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('players') ]);
};

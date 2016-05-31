
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('players', function(table){
			table.increments('id');
			table.string('first_name');
			table.string('last_name');
			table.string('img_url');
			table.string('nickname');
			table.string('birthday');
			table.string('number');
			table.string('position');
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
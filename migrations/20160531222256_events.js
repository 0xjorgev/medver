
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('events', function(table){
			table.increments('id').primary();
			table.boolean('active').notNullable().defaultTo(true);
			table.string('img_url');
			table.string('name');
			table.string('description');
			table.integer('level');
			table.integer('increments_by');

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
			//Relationships
			table.integer('subdiscipline_id').references('subdiscipline.id').index();
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('events') ]);
};
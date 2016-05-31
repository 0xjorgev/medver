
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('rounds', function(table){
			table.increments('id').primary();
			table.string('name');
			table.timestamp('start_date');
			table.timestamp('end_date');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('group_id').references('groups.id').index();
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
	return Promise.all([ knex.schema.dropTableIfExists('rounds') ]);
};
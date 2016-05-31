
exports.up = function(knex, Promise) {
      return Promise.all([
		knex.schema.createTable('rulesets', function(table){
			table.increments('id').primary();
			table.string('name');
			table.string('short_name');
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
  return Promise.all([ knex.schema.dropTableIfExists('rulesets') ]);
};

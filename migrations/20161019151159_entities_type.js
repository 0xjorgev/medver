
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('entities_types', function(table){
      table.increments('id').primary();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.text('description');
    })
    .then(function(){
      //Add query
            return knex.raw('');
        })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
		knex.schema.dropTableIfExists('entities_types')
	])
};

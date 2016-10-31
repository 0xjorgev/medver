
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('entities', function(table){
      table.increments('id').primary();
      table.integer('object_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
		knex.schema.dropTableIfExists('entities')
	])
};

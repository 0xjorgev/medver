
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('events_calendars', function(table){
			table.increments('id').primary()
			table.string('title')
			table.timestamp('start_at').defaultTo(knex.fn.now())
			table.timestamp('end_at').defaultTo(knex.fn.now())
			table.string('place')
			table.text('comment')
			table.integer('events_calendars_types_id').references('events_calendars_types.id').index();
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('events_calendars')
	])
};

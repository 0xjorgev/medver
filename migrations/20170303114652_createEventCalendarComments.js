
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('events_calendars_comments', function(table){
			table.increments('id').primary()
			table.text('comment')
      		table.integer('user_id').references('users.id');
      		table.integer('event_id').references('events_calendars.id');
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('events_calendars_comments')
	])
};

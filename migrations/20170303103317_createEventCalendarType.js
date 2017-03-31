
exports.up = function(knex, Promise) {
  
	return Promise.all([
		knex.schema.createTable('events_calendars_types', function(table){
			table.increments('id').primary()
			table.string('code')
			table.boolean('img_url').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('events_calendars_types')
	])
};

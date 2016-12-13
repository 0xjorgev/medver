
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('feed_items', function(table){
			table.increments('id').primary()
			table.text('message_en')
			table.text('message_es')
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('feed_items')
	])
};

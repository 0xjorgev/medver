
exports.up = function(knex, Promise) {
  	
	return Promise.all([
		knex.schema.createTable('persons', function(table){
			table.increments('id').primary()
			table.string('name')
			table.string('last_name')
			table.string('nickname')
			table.date('birthday')
			table.string('email')
			table.integer('gender_id').references('genders.id').index()
			table.string('height') //Se usaran las unidad metrica
			table.string('weight') //Se usaran las unidad metrica
			table.integer('status_type_id').references('status_types.id').index()
			table.string('img_url')
			table.string('document_number')
			table.string('document_img_url')
			table.string('country')
			table.timestamp('claimed')
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('persons')
	])
};

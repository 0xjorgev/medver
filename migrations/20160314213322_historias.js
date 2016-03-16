
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('historias', function(table){
			table.increments('id');
			table.string('historia_anterior');
			table.text('contenido');
			table.text('antecedente');
			table.boolean('active').notNullable().defaultTo(true);
			//table.integer('medico_id').references('medicos.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('historias') ]);
};
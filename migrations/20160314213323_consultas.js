exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('consultas', function(table){
			table.increments('id');
			table.text('antecedente');
			table.text('tratamiento');
			table.timestamp('fecha');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('historia_id').references('historias.id').index();
			table.integer('tipo_consulta_id').references('tipo_consultas.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('consultas') ]);
};
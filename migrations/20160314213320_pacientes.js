
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.createTable('pacientes', function(table){
			table.increments('id');
			table.string('nombre').notNullable();
			table.string('apellido').notNullable();
			table.string('alergia');
			table.string('email');
			table.string('telefono_principal');
			table.string('sexo');
			table.string('cedula');
			table.integer('historia_anterior');
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('fecha_nacimiento');
			table.integer('historia_id').references('historias.id').index();
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('pacientes') ]);
};
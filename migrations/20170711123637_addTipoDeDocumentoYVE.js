
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('pacientes', (table) => {
			table.string('tipo_documento');
			table.string('sigla_documento');
			table.string('numero_documento');
		})
	])
	.then(function(){
		//Migro la informacion de player a la tabla temporal person colocando el id del player como player_id
		knex.schema.alterTable('pacientes', (table) => {
			table.dropColumn('cedula')
		})
	})
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('pacientes', (table) => {
			table.dropColumn('tipo_documento')
			table.dropColumn('sigla_documento')
			table.dropColumn('numero_documento')
		})
	])
};
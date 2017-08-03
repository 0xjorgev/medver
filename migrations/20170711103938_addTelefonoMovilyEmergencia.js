
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('pacientes', (table) => {
			table.string('telefono_movil');
			table.string('telefono_emergencias');
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('pacientes', (table) => {
			table.dropColumn('telefono_movil')
			table.dropColumn('telefono_emergencias')
		})
	])
};
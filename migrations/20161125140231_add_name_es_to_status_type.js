exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('status_types', (table) => {
			table.string('description_en')
			table.string('description_es')
		})
		.then(function(){
			return Promise.all([
				knex.raw("update status_types set description_en = 'In process', description_es='En proceso' where description = 'In Process'")
				,knex.raw("update status_types set description_en = 'Approved', description_es='Aprobado' where description = 'Approved'")
				,knex.raw("update status_types set description_en = 'Rejected', description_es='Rechazado' where description = 'Rejected'")
				,knex.raw("update status_types set description_en = 'Pending', description_es='Pendiente' where description = 'Pending'")
				,knex.raw("update status_types set description = 'Acepted', description_en = 'Accepted', description_es='Aceptado' where description = 'Acepted'")
			])
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('status_types', (table) => {
			table.dropColumn('description_en')
			table.dropColumn('description_es')
		})
	])
};

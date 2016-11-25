exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('genders', (table) => {
			table.string('name_en')
			table.string('name_es')
		})
		.then(function(){
			return Promise.all([
				knex.raw("update genders set name_en = 'Masculine', name_es='Masculino' where name = 'Masculine'")
				,knex.raw("update genders set name_en = 'Femenine', name_es='Femenino' where name = 'Femenine'")
				,knex.raw("update genders set name_en = 'Coed', name_es='Mixto' where name = 'Mixed'")
			])
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('genders', (table) => {
			table.dropColumn('name_en')
			table.dropColumn('name_es')
		})
	])
};

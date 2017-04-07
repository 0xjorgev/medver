
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('categories_types', (table) => {
			table.string('name_en')
			table.string('name_es')
		})
		.then(function(){
			return Promise.all([
				 knex.raw("update categories_types set name_en = 'Professional', name_es='Profesional', name='PROFESIONAL', description='Professional Football' where name = 'Professional'")
				,knex.raw("update categories_types set name_en = 'U-23', name_es='Sub-23', name = 'U-23' where name = 'Sub 23'")
				,knex.raw("update categories_types set name_en = 'U-22', name_es='Sub-22', name = 'U-22' where name = 'Sub 22'")
				,knex.raw("update categories_types set name_en = 'U-21', name_es='Sub-21', name = 'U-21' where name = 'Sub 21'")
				,knex.raw("update categories_types set name_en = 'U-20', name_es='Sub-20', name = 'U-20' where name = 'Sub 20'")
				,knex.raw("update categories_types set name_en = 'U-19', name_es='Sub-19', name = 'U-19' where name = 'Sub 19'")
				,knex.raw("update categories_types set name_en = 'U-18', name_es='Sub-18', name = 'U-18' where name = 'Sub 18'")
				,knex.raw("update categories_types set name_en = 'U-17', name_es='Sub-17', name = 'U-17' where name = 'Sub 17'")
				,knex.raw("update categories_types set name_en = 'U-16', name_es='Sub-16', name = 'U-16' where name = 'Sub 16'")
				,knex.raw("update categories_types set name_en = 'U-15', name_es='Sub-15', name = 'U-15' where name = 'Sub 15'")
				,knex.raw("update categories_types set name_en = 'U-14', name_es='Sub-14', name = 'U-14' where name = 'Sub 14'")
				,knex.raw("update categories_types set name_en = 'U-13', name_es='Sub-13', name = 'U-13' where name = 'Sub 13'")
				,knex.raw("update categories_types set name_en = 'U-12', name_es='Sub-12', name = 'U-12' where name = 'Sub 12'")
				,knex.raw("update categories_types set name_en = 'U-11', name_es='Sub-11', name = 'U-11' where name = 'Sub 11'")
				,knex.raw("update categories_types set name_en = 'U-10', name_es='Sub-10', name = 'U-10' where name = 'Sub 10'")
				,knex.raw("update categories_types set name_en = 'U-9', name_es='Sub-9', name = 'U-9' where name = 'Sub 9'")
				,knex.raw("update categories_types set name_en = 'U-8', name_es='Sub-8', name = 'U-8' where name = 'Sub 8'")
				,knex.raw("update categories_types set name_en = 'U-7', name_es='Sub-7', name = 'U-7' where name = 'Sub 7'")
				,knex.raw("update categories_types set name_en = 'U-6', name_es='Sub-6', name = 'U-6' where name = 'Sub 6'")
				,knex.raw("update categories_types set name_en = 'U-5', name_es='Sub-5', name = 'U-5' where name = 'Sub 5'")
				,knex.raw("update categories_types set name_en = 'U-6', name_es='Sub-6', name = 'U-6' where name = 'Sub 6'")
				,knex.raw("update categories_types set name_en = 'U-5', name_es='Sub-5', name = 'U-5' where name = 'Sub 5'")
				,knex.raw("insert into categories_types (name_en, name_es, name, minimum_value, maximum_value,  description) values ('Open', 'Abierta', 'OPEN', 0, 99, 'Open Football' )")
				,knex.raw("insert into categories_types (name_en, name_es, name, minimum_value, maximum_value,  description) values ('N/A', 'N/A', 'N/A', 0, 99, 'N/A' )")
			])
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('categories_types', (table) => {
			table.dropColumn('name_en')
			table.dropColumn('name_es')
		})
	])
};


exports.up = function(knex, Promise) {
  	return Promise.all(
		[knex.raw('drop sequence disciplines_id_seq')
		,knex.raw('drop sequence subdisciplines_id_seq')
		,knex.raw('drop sequence categories_types_id_seq')
		,knex.raw('drop sequence classifications_types_id_seq')
		,knex.raw('drop sequence competitions_types_id_seq')
		,knex.raw('drop sequence events_id_seq')
		,knex.raw('drop sequence genders_id_seq')
		,knex.raw('drop sequence positions_id_seq')
		,knex.raw('drop sequence status_types_id_seq')
		,knex.raw('drop sequence relationships_types_id_seq')
	])
};

exports.down = function(knex, Promise) {
	return Promise.all(
		[knex.raw('create sequence disciplines_id_seq')
		,knex.raw('create sequence subdisciplines_id_seq')
		,knex.raw('create sequence categories_types_id_seq')
		,knex.raw('create sequence classifications_types_id_seq')
		,knex.raw('create sequence competitions_types_id_seq')
		,knex.raw('create sequence events_id_seq')
		,knex.raw('create sequence genders_id_seq')
		,knex.raw('create sequence positions_id_seq')
		,knex.raw('create sequence status_types_id_seq')
		,knex.raw('create sequence relationships_types_id_seq')
	])
};

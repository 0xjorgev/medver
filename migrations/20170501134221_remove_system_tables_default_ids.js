
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.raw('alter table disciplines alter column id drop default')
		,knex.raw('alter table subdisciplines alter column id drop default')
		,knex.raw('alter table categories_types alter column id drop default')
		,knex.raw('alter table classifications_types alter column id drop default')
		,knex.raw('alter table competitions_types alter column id drop default')
		,knex.raw('alter table events alter column id drop default')
		,knex.raw('alter table genders alter column id drop default')
		,knex.raw('alter table positions alter column id drop default')
		,knex.raw('alter table status_types alter column id drop default')
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		 knex.raw('alter table disciplines alter column id set default nextval(\'disciplines_id_seq\'::regclass)')
		,knex.raw('alter table subdisciplines alter column id set default nextval(\'subdisciplines_id_seq\'::regclass)')
		,knex.raw('alter table categories_types alter column id set default nextval(\'categories_types_id_seq\'::regclass)')
		,knex.raw('alter table classifications_types alter column id set default nextval(\'classifications_types_id_seq\'::regclass)')
		,knex.raw('alter table competitions_types alter column id set default nextval(\'competitions_types_id_seq\'::regclass)')
		,knex.raw('alter table events alter column id set default nextval(\'events_id_seq\'::regclass)')
		,knex.raw('alter table genders alter column id set default nextval(\'genders_id_seq\'::regclass)')
		,knex.raw('alter table positions alter column id set default nextval(\'positions_id_seq\'::regclass)')
		,knex.raw('alter table status_types alter column id set default nextval(\'status_types_id_seq\'::regclass)')
	])
};

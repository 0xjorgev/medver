
exports.up = function(knex, Promise) {
	return Promise.all([
  		knex.raw('alter table relationships_types alter column id drop default')
  	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.raw('alter table relationships_types alter column id set default nextval(\'relationships_types_id_seq\'::regclass)')
	])
};

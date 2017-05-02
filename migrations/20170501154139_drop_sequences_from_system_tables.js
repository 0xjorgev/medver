
exports.up = function(knex, Promise) {
	return knex.raw('drop sequence relationships_types_id_seq')
};

exports.down = function(knex, Promise) {
	return knex.raw('create sequence relationships_types_id_seq')
};

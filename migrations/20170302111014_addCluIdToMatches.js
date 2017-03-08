
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.integer('club_id').references('clubs.id').index();
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('matches', (table) => {
			table.dropColumn('club_id')
		})
	])
};
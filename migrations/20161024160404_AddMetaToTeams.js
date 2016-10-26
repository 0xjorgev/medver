
//y asi fue como empezo el fin del mundo
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('teams', (table) => {
			table.text('meta')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('teams', (table) => {
			table.dropColumn('meta')
		})
	])
};

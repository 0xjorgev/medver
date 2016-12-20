
//y asi fue como empezo el fin del mundo
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('teams', (table) => {
			table.string('portrait_url')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('teams', (table) => {
			table.dropColumn('portrait_url')
		})
	])
};

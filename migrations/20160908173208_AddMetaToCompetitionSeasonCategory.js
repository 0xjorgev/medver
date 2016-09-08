
//y asi fue como empezo el fin del mundo
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.text('meta')
		}),
		knex.schema.alterTable('seasons', (table) => {
			table.text('meta')
		}),
		knex.schema.alterTable('categories', (table) => {
			table.text('meta')
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('competitions', (table) => {
			table.dropColumn('meta')
		}),
		knex.schema.alterTable('seasons', (table) => {
			table.dropColumn('meta')
		}),
		knex.schema.alterTable('categories', (table) => {
			table.dropColumn('meta')
		})
	])
};

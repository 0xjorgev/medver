exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.string('document_img_url')
		})
	])
}

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.dropColumn('document_img_url')
		})
	])
}

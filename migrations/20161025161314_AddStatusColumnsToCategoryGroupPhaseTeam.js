
exports.up = function(knex, Promise) {
  return Promise.all([
		knex.schema.alterTable('categories_groups_phases_teams', (table) => {
			table.boolean('payment').defaultTo('false')
      table.boolean('roster').defaultTo('false')
      table.boolean('document').defaultTo('false')
		})
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('categories_groups_phases_teams', (table) => {
      table.dropColumn('payment')
      table.dropColumn('roster')
      table.dropColumn('document')
    })
  ])
};

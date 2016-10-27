
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('categories_groups_phases_teams', (table) => {
      table.integer('status_id').references('status_types.id').index()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('categories_groups_phases_teams', (table) => {
      table.dropColumn('status_id')
    })
  ])
};

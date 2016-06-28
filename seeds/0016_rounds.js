
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rounds').del(),
    /*
      table.increments('id');
			table.string('name');
			table.timestamp('start_date');
			table.timestamp('end_date');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('group_id').references('groups.id').index();
    */
    // Inserts seed entries
    knex('rounds').insert({id: 1, name: 'Primera Ronda', group_id:1}),
    knex('rounds').insert({id: 2, name: 'Segunda Ronda', group_id:1}),
    knex('rounds').insert({id: 3, name: 'Primera Ronda', group_id:2}),
    knex('rounds').insert({id: 4, name: 'Segunda Ronda', group_id:2})
  );
};

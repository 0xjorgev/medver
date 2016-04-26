
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('groups').del(),
    /*

			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('phase_id').references('phases.id').index();

    */
    // Inserts seed entries
    knex('groups').insert({id: 1, name: 'Grupo A', phase_id:1}),
    knex('groups').insert({id: 2, name: 'Grupo B', phase_id:1}),
    knex('groups').insert({id: 3, name: 'Finalistas', phase_id:2})
  );
};


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('entities_types').del(),

    // Inserts seed entries
    knex('entities_types').insert({description: 'User'}),
    knex('entities_types').insert({description: 'Team'}),
    knex('entities_types').insert({description: 'Player'})
  );
};

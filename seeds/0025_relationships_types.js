
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('relationships_types').del(),

    // Inserts seed entries
    knex('relationships_types').insert({name: 'OWNER'}),
    knex('relationships_types').insert({name: 'COACH'})
  );
};

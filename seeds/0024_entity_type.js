
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('entities_types').del(),

    // Inserts seed entries
    knex('entities_types').insert({description: 'User'})
    ,knex('entities_types').insert({description: 'Team'})
    ,knex('entities_types').insert({description: 'Player'})
    ,knex('entities_types').insert({description: 'Category'})
    ,knex('entities_types').insert({description: 'Club'})
    ,knex('entities_types').insert({description: 'Competition'})
    ,knex('entities_types').insert({description: 'Couch'})
    ,knex('entities_types').insert({description: 'Person'})
  );
};

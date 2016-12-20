
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('relationships_types').del(),

    // Inserts seed entries
    knex('relationships_types').insert({name: 'OWNER'})
    ,knex('relationships_types').insert({name: 'COACH'})
    ,knex('relationships_types').insert({name: 'FEED ITEM OF'})
	,knex('relationships_types').insert({name: 'FAN'})
    ,knex('relationships_types').insert({name: 'PLAYER'})
    ,knex('relationships_types').insert({name: 'PARTICIPANT'})
    ,knex('relationships_types').insert({name: 'AFFILIATE'})
    ,knex('relationships_types').insert({name: 'SUMMONED'})
  );
};


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('relationships_types').del(),

    // Inserts seed entries
    knex('relationships_types').insert({name: 'OWNER'}) //1
    ,knex('relationships_types').insert({name: 'COACH'}) //2
    ,knex('relationships_types').insert({name: 'FEED ITEM OF'})//3
	,knex('relationships_types').insert({name: 'FAN'}) //4
    ,knex('relationships_types').insert({name: 'COMMENT OF'}) //5
    ,knex('relationships_types').insert({name: 'PLAYER'})//6
    ,knex('relationships_types').insert({name: 'MEMBER'})//7
    ,knex('relationships_types').insert({name: 'EVENT CALENDAR OF'})//8
  );
};


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('events_matches_players').del(),

    // Inserts seed entries
    knex('events_matches_players').insert({}),
    knex('events_matches_players').insert({})
    );
};
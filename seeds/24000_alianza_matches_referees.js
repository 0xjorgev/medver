console.log('24000 Matches Referees')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('matches_referees').del(),
    // Archies
     knex('matches_referees').insert({ "match_id":24,"referee_id":1})

    )
};
console.log('24000 Ok')

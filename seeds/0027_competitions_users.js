console.log('0027 seeding competitions_users')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions_users').del()

    // Inserts seed entries
    // knex('competitions_users').insert({id:1, user_id:1, competition_id:1}),
    // knex('competitions_users').insert({id:2, user_id:2, competition_id:1})
    )
};
console.log('0027 Ok')

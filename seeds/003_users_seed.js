exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, username:'jorge', password:'123456', email:'jorgevmendoza@gmail.com'}),
    knex('users').insert({id: 2, username:'demo', password:'123456', email:'demo@somosport.com'})
    );
};
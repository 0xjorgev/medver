exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({username:'jorge', password:'e10adc3949ba59abbe56e057f20f883e', email:'jorgevmendoza@gmail.com'}),
    knex('users').insert({username:'demo', password:'e10adc3949ba59abbe56e057f20f883e', email:'demo@somosport.com'}),
    knex('users').insert({username:'tulio', password:'043219f7b72865e3e59e282c39e1a937', email:'tminuta@gmail.com'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
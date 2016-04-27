exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('roles').del(),
    knex('roles').insert({id: 1, description: 'owner'}),
    knex('roles').insert({id: 2, description: 'belongsTo'}),
    knex('roles').insert({id: 3, description: 'administrator'}),
    knex('roles').insert({id: 4, description: 'follower'}),
    knex('roles').insert({id: 5, description: 'fan'}),
    knex('roles').insert({id: 6, description: 'afilliate'})
    ).then(function(){
		//Add query
        // return knex.raw('update roles_sequence_id ');
        return knex.raw('');
    });
};
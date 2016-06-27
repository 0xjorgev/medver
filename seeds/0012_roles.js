
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('roles').del(),
    knex('roles').insert({description: 'owner'}),
    knex('roles').insert({description: 'belongsTo'}),
    knex('roles').insert({description: 'administrator'}),
    knex('roles').insert({description: 'follower'}),
    knex('roles').insert({description: 'fan'}),
    knex('roles').insert({description: 'afilliate'})
    ).then(function(){
		//Add query
        // return knex.raw('update roles_sequence_id ');
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
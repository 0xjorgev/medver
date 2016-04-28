exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations_types').del(),
    // Inserts seed entries
        knex('organizations_types').insert({id:1, name:'Federación', description:''}),
        knex('organizations_types').insert({id:2, name:'Liga', description:''}),
        knex('organizations_types').insert({id:3, name:'Club', description:''}),
        knex('organizations_types').insert({id:4, name:'Selección', description:''}),
        knex('organizations_types').insert({id:5, name:'Equipo', description:''}),
        knex('organizations_types').insert({id:6, name:'Unipersonal', description:''}),
        knex('organizations_types').insert({id:7, name:'Unipersonal', description:''})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
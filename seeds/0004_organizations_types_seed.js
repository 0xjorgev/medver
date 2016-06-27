
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations_types').del(),
    // Inserts seed entries
        knex('organizations_types').insert({name:'Federación', description:'Federación description'}),
        knex('organizations_types').insert({name:'Liga', description:'Liga description'}),
        knex('organizations_types').insert({name:'Club', description:'Club description'}),
        knex('organizations_types').insert({name:'Selección', description:'Selección description'}),
        knex('organizations_types').insert({name:'Equipo', description:'Equipo description'}),
        knex('organizations_types').insert({name:'Unipersonal', description:'Unipersonal description'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('contacts_types').del(),

    // Inserts seed entries
    knex('contacts_types')
    .insert([
        {name:'phone', active:true}
        ,{name:'email', active:true}
        ,{name:'website', active:true}
        ,{name:'facebook', active:true}
        ,{name:'twitter', active:true}
        ,{name:'instagram', active:true}
        ,{name:'snapchat', active:true}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

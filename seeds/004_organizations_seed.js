exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations').del(),

    // Inserts seed entries
    knex('organizations')
    .insert(
        {
            name:'Alianza de futbtol',
            website:'http://www.alianzadefutbol.com'
        })
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
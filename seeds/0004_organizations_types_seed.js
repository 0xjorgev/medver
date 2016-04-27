exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations').del(),
    // Inserts seed entries
        knex('organizations').insert({id:1, name:'Alianza de futbtol', description:'http://www.alianzadefutbol.com', foundation_date:'2000-12-24 16:11:56.576272-04:30',personal:false}),
        knex('organizations').insert({id:2, name:'Barcelona Futbol Club', description:'http://http://www.fcbarcelona.com', foundation_date:'1899-11-29 16:11:56.576272-04:30', personal:false})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
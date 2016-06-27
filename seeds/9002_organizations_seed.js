console.log('9002 start')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations').del(),
    // Inserts seed entries
        knex('organizations').insert({name:'Alianza de futbtol', description:'http://www.alianzadefutbol.com', foundation_date:'2000-12-24 16:11:56.576272-04:30', organization_type_id:2}),
        knex('organizations').insert({name:'Barcelona Futbol Club', description:'http://http://www.fcbarcelona.com', foundation_date:'1899-11-29 16:11:56.576272-04:30', organization_type_id:3}),
        knex('organizations').insert({name:'Testing Club 1', description:'Testing Club 1', foundation_date:'2016-01-01 16:11:56.576272-04:30', organization_type_id:3}),
        knex('organizations').insert({name:'Testing Club 2', description:'Testing Club 2', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:3})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
console.log('9002 end')
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('status_types').del(),

    // Inserts seed entries
    knex('status_types').insert({description: 'In Process', type:'pre-registration'})
    ,knex('status_types').insert({description: 'Approved', type:'pre-registration'})
    ,knex('status_types').insert({description: 'Rejected', type:'pre-registration'})
    ,knex('status_types').insert({description: 'Acepted', type:'request'})
    ,knex('status_types').insert({description: 'Rejected', type:'request'})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

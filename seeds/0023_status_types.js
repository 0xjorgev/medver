console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('status_types').del(),

    // Inserts seed entries
    knex('status_types').insert({description: 'In Process', type:'pre-registration', code: 'pre-registration-in-progress'})
    ,knex('status_types').insert({description: 'Approved', type:'pre-registration', code: 'pre-registration-approved'})
    ,knex('status_types').insert({description: 'Rejected', type:'pre-registration', code: 'pre-registration-rejected'})
    ,knex('status_types').insert({description: 'Acepted', type:'request', code: 'request-acepted'})
    ,knex('status_types').insert({description: 'Rejected', type:'request', code: 'request-rejected'})
    ,knex('status_types').insert({description: 'Pending', type:'request', code: 'request-pending'})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('status_types').del(),

    // Inserts seed entries
    knex('status_types').insert({description: 'In Process'})
    ,knex('status_types').insert({description: 'Approved'})
    ,knex('status_types').insert({description: 'Rejected'})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

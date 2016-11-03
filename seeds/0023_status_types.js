
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('status_types').del(), 

    // Inserts seed entries
    knex('status_types').insert({id: 1, description: 'In Process'})
    ,knex('status_types').insert({id: 2, description: 'Approved'})
    ,knex('status_types').insert({id: 3, description: 'Reject'})
    ,knex('status_types').insert({id: 4, description: 'Invited'})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

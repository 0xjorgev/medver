
console.log('18000 seeding alianza GRoups')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Groups Data
    //==========================================================================
    knex('groups').insert({id: 15, name: 'Grupo A', phase_id:6}),
    knex('groups').insert({id: 16, name: 'Grupo B', phase_id:6}),
    knex('groups').insert({id: 17, name: 'Grupo Semi-final', phase_id:7}),
    knex('groups').insert({id: 18, name: 'Grupo Final', phase_id:8})
  )
}
console.log('18000 OK')

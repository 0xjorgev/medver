
console.log('11000 seeding alianza Teams')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Teams
    //==========================================================================
    knex('teams').insert({id: 10, name: 'Cholitas', short_name:'Xolas', description:'Cholitas Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:5}),
    //==========================================================================
    // Team 2: Coesta Checa - Teams
    //==========================================================================
    knex('teams').insert({id: 11, name: 'Costa Chica', short_name:'CC', description:'Costa Chica Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:6}),
    //==========================================================================
    // Team 3: Norcross Eagles - Teams
    //==========================================================================
    knex('teams').insert({id: 12, name: 'Norcross Eagles', short_name:'NE', description:'Norcross Eagles Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:7}),
    //==========================================================================
    // Team 4: Sur Carolina (Del) - Teams
    //==========================================================================
    knex('teams').insert({id: 13, name: 'Sur Carolina (Del)', short_name:'SD', description:'Sur Carolina (Del) Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:8}),
    //==========================================================================
    // Team 5: United Academia - Teams
    //==========================================================================
    knex('teams').insert({id: 14, name: 'United Academia', short_name:'UA', description:'United Academia Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:9}),
    //==========================================================================
    // Team 6: Archi - Teams
    //==========================================================================
    knex('teams').insert({id: 15, name: 'Archi', short_name:'ARCHI', description:'Archi Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:10}),
    //==========================================================================
    // Team 7: Fusion - Organizations
    //==========================================================================
    knex('teams').insert({id: 16, name: 'Fusion', short_name:'FUSION', description:'Fusion Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:11}),
    //==========================================================================
    // Team 8: Pedro Espinoza - Organizations
    //==========================================================================
    knex('teams').insert({id: 17, name: 'Pedro Espinoza', short_name:'PE', description:'Pedro Espinoza Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:12})
  )
}

console.log('11000 OK')

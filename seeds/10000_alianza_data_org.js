
console.log('10000 seeding alianza org')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Organizations
    //==========================================================================
    knex('organizations').insert({id:5, name:'Cholitas', description:'Cholitas Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 2: Coesta Checa - Organizations
    //==========================================================================
    knex('organizations').insert({id:6, name:'Costa Chica', description:'Costa Chica Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 3: Norcross Eagles - Organizations
    //==========================================================================
    knex('organizations').insert({id:7, name:'Norcross Eagles', description:'Norcross Eagles Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 4: Sur Carolina (Del), - Organizations
    //==========================================================================
    knex('organizations').insert({id:8, name:'Sur Carolina (Del)', description:'Sur Carolina (Del) Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 5: United Academia - Organizations
    //==========================================================================
    knex('organizations').insert({id:9, name:'United Academia', description:'United Academia Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 6: Archi - Organizations
    //==========================================================================
    knex('organizations').insert({id:10, name:'Archi', description:'Archi Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 7: Fusion - Organizations
    //==========================================================================
    knex('organizations').insert({id:11, name:'Fusion', description:'Fusion Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 8: Pedro Espinoza - Organizations
    //==========================================================================
    knex('organizations').insert({id:12, name:'Pedro Espinoza', description:'Pedro Espinoza Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5})
)}
console.log('10000 OK')


console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {

    console.log('----------------------------------------------')
    console.log(knex('teams').insert({id: 10, name: 'PEPE', short_name:'Xolas', description:'Cholitas Prueba Alianza Atlanta', logo_url:'', category_type_id:10, organization_id:5}))
    console.log('----------------------------------------------')




  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Cholitas', description:'Cholitas Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 2: Coesta Checa - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Costa Chica', description:'Costa Chica Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 3: Norcross Eagles - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Norcross Eagles', description:'Norcross Eagles Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 4: Sur Carolina (Del), - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Sur Carolina (Del)', description:'Sur Carolina (Del) Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 5: United Academia - Organizations
    //==========================================================================
    knex('organizations').insert({name:'United Academia', description:'United Academia Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 6: Archi - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Archi', description:'Archi Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 7: Fusion - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Fusion', description:'Fusion Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5}),
    //==========================================================================
    // Team 8: Pedro Espinoza - Organizations
    //==========================================================================
    knex('organizations').insert({name:'Pedro Espinoza', description:'Pedro Espinoza Prueba Alianza Atlanta', foundation_date:'2016-02-01 16:11:56.576272-04:30', organization_type_id:5})
)}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
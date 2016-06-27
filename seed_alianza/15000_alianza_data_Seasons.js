
console.log('15000 seeding alianza Seasons')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Seasons Data
    //==========================================================================
    knex('seasons').insert({id:12, name:'Atlanta 2016',description:'Altanta 2016, Copa Coca-Cola',game_title:'Coca-Cola Cup',competition_id:10 })
  )
}
console.log('15000 OK')


console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Seasons Data
    //==========================================================================
     knex('seasons').insert({name:'Atlanta 2016',description:'Altanta 2016, Copa Coca-Cola',game_title:'Coca-Cola Cup',competition_id:2, init_at:'2016-06-11 08:30:03.70419-04:30', ends_at:'2016-06-12 08:30:03.70419-04:30'})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')

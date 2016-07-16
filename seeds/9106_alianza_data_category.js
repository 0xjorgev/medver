
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Category Data
    //==========================================================================
     knex('categories').insert({name:'Atlanta Copa Coca-Cola Girls U-15',gender_id:2, season_id:2, classification_type_id:2, category_type_id:10, inscription_init_at:'2016-06-12 08:30:03.70419-04:30',inscription_ends_at:'2016-06-15 08:30:03.70419-04:30',player_minimum_participant:8, player_maximum_participant:11, team_quantity:8 })
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')

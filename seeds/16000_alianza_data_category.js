
console.log('16000 seeding alianza Category')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Category Data
    //==========================================================================
    knex('categories').insert({id: 12, name:'Atlanta Copa Coca-Cola Girls U-15',gender_id:2, season_id:12, classification_type_id:2, category_type_id:10, player_minimum_participant:8, player_maximum_participant:11 })
  )
}
console.log('16000 OK')

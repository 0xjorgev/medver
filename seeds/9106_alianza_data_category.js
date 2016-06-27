
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Category Data
    //==========================================================================
    knex('categories').insert({id: 12, name:'Atlanta Copa Coca-Cola Girls U-15',gender_id:2, season_id:12, classification_type_id:2, category_type_id:10})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
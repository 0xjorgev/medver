
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Phases Data
    //==========================================================================
    knex('phases').insert({name: 'Fase general', position:0, category_id:4, participant_team:8, classified_team:4}),
    knex('phases').insert({name: 'Semi-final', position:1, category_id:4, participant_team:4, classified_team:2}),
    knex('phases').insert({name: 'Final', position:2, category_id:4, participant_team:2, classified_team:1})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
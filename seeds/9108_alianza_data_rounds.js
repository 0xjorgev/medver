
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Rounds Data
    //==========================================================================

      knex('rounds').insert({name: 'Primera Ronda', group_id: 4 }),
      knex('rounds').insert({name: 'Primera Ronda', group_id: 5 }),
      knex('rounds').insert({name: 'Segunda Ronda', group_id: 4 }),
      knex('rounds').insert({name: 'Segunda Ronda', group_id: 5 }),
      knex('rounds').insert({name: 'Ronda Semifinal', group_id: 6 }),
      knex('rounds').insert({name: 'Ronda Final', group_id: 7 })
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
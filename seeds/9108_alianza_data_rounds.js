
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Rounds Data
    //==========================================================================

      knex('rounds').insert({id: 12, name: 'Primera Ronda', group_id:15}),
      knex('rounds').insert({id: 13, name: 'Primera Ronda', group_id:16}),
      knex('rounds').insert({id: 14, name: 'Segunda Ronda', group_id:15}),
      knex('rounds').insert({id: 15, name: 'Segunda Ronda', group_id:16}),
      knex('rounds').insert({id: 16, name: 'Ronda Semifinal', group_id:17}),
      knex('rounds').insert({id: 17, name: 'Ronda Final', group_id:18})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
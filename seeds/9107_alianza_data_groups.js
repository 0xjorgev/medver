
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Groups Data
    //==========================================================================
    knex('groups').insert({name: 'Grupo A', phase_id: 3	}),
    knex('groups').insert({name: 'Grupo B', phase_id: 3	}),
    knex('groups').insert({name: 'Grupo Semi-final', phase_id: 4 }),
    knex('groups').insert({name: 'Grupo Final', phase_id: 5 })
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
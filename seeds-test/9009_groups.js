
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('groups').del(),
    /*

			table.string('name');
			table.boolean('active').notNullable().defaultTo(true);
			table.integer('phase_id').references('phases.id').index();

    */
    // Inserts seed entries
    knex('groups').insert({name: 'Grupo A',             phase_id: 1 }),
    knex('groups').insert({name: 'Grupo B',             phase_id: 1 }),
    knex('groups').insert({name: 'Finalistas',          phase_id: 2 })
    // knex('groups').insert({name: 'Grupo A',             phase_id: 3	}),
    // knex('groups').insert({name: 'Grupo B',             phase_id: 3	}),
    // knex('groups').insert({name: 'Grupo Semi-final',    phase_id: 4 }),
    // knex('groups').insert({name: 'Grupo Final',         phase_id: 5 })
  );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
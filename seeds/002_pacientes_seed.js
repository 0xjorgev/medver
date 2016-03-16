exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    /*
            table.increments('id');
            table.string('nombre').notNullable();
            table.string('apellido').notNullable();
            table.string('alergia');
            table.string('email');
            table.string('telefono-principal');
            table.string('sexo');
            table.string('cedula');
            table.boolean('active').notNullable().defaultTo(true);
            table.timestamp('fecha_nacimiento');
            table.integer('historia_id').references('historias.id').index();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

    */

    // Inserts seed entries
    knex('pacientes').insert(
        {nombre:'Jorge', 
        apellido:'Mendoza', 
        email:'jorgevmendoza@gmail.com', 
        alergia:'aspirina', 
        telefono_principal: '04122630631',
        sexo:'M',
        cedula:'V14350280',
        fecha_nacimiento:"1979-10-08 23:00:00 UTC",
        historia_id:'1'
    })
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
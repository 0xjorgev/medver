exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('pacientes').del(),

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
    knex('pacientes').insert({nombre:'Juan Jose', apellido:'Minuta Troconiz', email:'jminuta@gmail.com', alergia:'Penicilina, Iboprofeno, Ampicilina', telefono_principal: '04123135070',sexo:'M',cedula:'V13309935',fecha_nacimiento:"1978-11-18 23:00:00 UTC",historia_id:'2'}),
    knex('pacientes').insert({nombre:'Jorge Vicente', apellido:'Mendoza Salazar', email:'jorgevmendoza@gmail.com', alergia:'aspirina', telefono_principal: '04122630631',sexo:'M',cedula:'V14350280',fecha_nacimiento:"1979-10-08 23:00:00 UTC",historia_id:'1'}),
    knex('pacientes').insert({nombre:'Ricardo Jose', apellido:'Sekermestrovic Simon', email:'rj_seker@gmail.com', alergia:'', telefono_principal: '02129796443',sexo:'M',cedula:'V13350280',fecha_nacimiento:"1978-11-27 23:00:00 UTC",historia_id:'3'})

    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
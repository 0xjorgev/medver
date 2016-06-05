exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('consultas').del(),

    /*
            table.text('antecedente');
            table.text('tratamiento');
            table.timestamp('fecha');
            table.boolean('active').notNullable().defaultTo(true);
            table.integer('historia_id').references('historias.id').index();
            table.integer('tipo_consulta_id').references('tipo_consultas.id').index();
    */

    // Inserts seed entries
    knex('consultas').insert({antecedente:'something in the past', tratamiento: 'Mucho reposo',fecha:'2015-10-08 23:00:00 UTC',historia_id:1,tipo_consulta_id:1})

    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
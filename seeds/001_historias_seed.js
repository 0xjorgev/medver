exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('historias').del(),


    /*


            table.increments('id');
            table.string('historia_anterior');
            table.text('contenido');
            table.text('antecedente');
            table.boolean('active').notNullable().defaultTo(true);
            //table.integer('medico_id').references('medicos.id').index();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

    */
    // Inserts seed entries
    knex('historias').insert({id:1, historia_anterior:1222, contenido:'many many many things shall be here .... ', antecedente:'Not so many'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
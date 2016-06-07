exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tipo_consultas').del(),

    // Inserts seed entries
    knex('tipo_consultas').insert({descripcion:'Primera consulta'}),
    knex('tipo_consultas').insert({descripcion:'control'}),
    knex('tipo_consultas').insert({descripcion:'Emergencia'}),
    knex('tipo_consultas').insert({descripcion:'Post Operatorio'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
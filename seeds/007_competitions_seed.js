exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions').del(),

    // Inserts seed entries
    /*

            table.string('name');
            table.boolean('active').notNullable().defaultTo(true);
            table.integer('discipline_id').references('disciplines.id').index();
            table.integer('subdiscipline_id').references('subdisciplines.id').index();
            table.integer('competition_type').references('competitions_types.id').index();

    */

    knex('competitions')
    .insert(
        {name:'Mushroom Cup',discipline_id:1, subdiscipline_id:2, competition_type_id:2}
        )
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
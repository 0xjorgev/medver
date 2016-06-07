exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('clasifications_types').del(),

    // Inserts seed entries

    /*
            table.increments('id');
            table.string('name');
            table.text('description');
            table.boolean('active').notNullable().defaultTo(true);
            table.string('image_url');
    */

    knex('clasifications_types')
    .insert([
        {id:1, name:'Simple Elimination',description:'Simple elimination model'},
        {id:2, name:'Custom Elimination',description:'Custom elimination model'}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
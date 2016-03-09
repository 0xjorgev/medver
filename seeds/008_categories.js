exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),

    // Inserts seed entries

    /*
            table.string('name');
            table.text('description');
            table.boolean('active').notNullable().defaultTo(true);
            table.string('image_url');
    */
    knex('categories')
    .insert(
        {name:'Professional',description:'Professional Futbol', gender_id:1, season_id:1},
        {name:'Sub 23',description:'Players under 23 years old', gender_id:1, season_id:1},
        {name:'Sub 22',description:'Players under 22 years old', gender_id:1, season_id:1},
        {name:'Sub 21',description:'Players under 21 years old', gender_id:1, season_id:1},
        {name:'Sub 20',description:'Players under 20 years old', gender_id:1, season_id:1},
        {name:'Sub 19',description:'Players under 19 years old', gender_id:1, season_id:1},
        {name:'Sub 18',description:'Players under 18 years old', gender_id:1, season_id:1},
        {name:'Sub 17',description:'Players under 17 years old', gender_id:1, season_id:1},
        {name:'Sub 16',description:'Players under 16 years old', gender_id:1, season_id:1},
        {name:'Sub 15',description:'Players under 15 years old', gender_id:1, season_id:1},
        {name:'Sub 14',description:'Players under 14 years old', gender_id:1, season_id:1},
        {name:'Infant',description:'Kids under 13 years old', gender_id:1, season_id:1}

        )
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
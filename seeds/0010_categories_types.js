exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories_types').del(),

    // Inserts seed entries

    /*
        TODO: Verify relationships with conditional data!!

        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1
        gender_id:1, season_id:1

        table.integer('minimum_value');
        table.integer('maximum_value');
    */

    knex('categories_types')
    .insert([
        {id: 1, name:'Professional',description:'Professional Futbol', minimum_value:0, maximum_value:99},
        {id: 2, name:'Sub 23',description:'Players under 23 years old', minimum_value:0, maximum_value:22},
        {id: 3, name:'Sub 22',description:'Players under 22 years old', minimum_value:0, maximum_value:21},
        {id: 4, name:'Sub 21',description:'Players under 21 years old', minimum_value:0, maximum_value:20},
        {id: 5, name:'Sub 20',description:'Players under 20 years old', minimum_value:0, maximum_value:19},
        {id: 6, name:'Sub 19',description:'Players under 19 years old', minimum_value:0, maximum_value:18},
        {id: 7, name:'Sub 18',description:'Players under 18 years old', minimum_value:0, maximum_value:17},
        {id: 8, name:'Sub 17',description:'Players under 17 years old', minimum_value:0, maximum_value:16},
        {id: 9, name:'Sub 16',description:'Players under 16 years old', minimum_value:0, maximum_value:15},
        {id: 10, name:'Sub 15',description:'Players under 15 years old', minimum_value:0, maximum_value:14},
        {id: 11, name:'Sub 14',description:'Players under 14 years old', minimum_value:0, maximum_value:13},
        {id: 12, name:'Infant',description:'Kids under 13 years old', minimum_value:0, maximum_value:12}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
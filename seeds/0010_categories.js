exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),

    // Inserts seed entries

    /*
        TODO: Verify relationships with conditional data!!
    */

    knex('categories')
    .insert([
        {id: 1, name:'Professional',description:'Professional Futbol', gender_id:1, season_id:1},
        {id: 2, name:'Sub 23',description:'Players under 23 years old', gender_id:1, season_id:1},
        {id: 3, name:'Sub 22',description:'Players under 22 years old', gender_id:1, season_id:1},
        {id: 4, name:'Sub 21',description:'Players under 21 years old', gender_id:1, season_id:1},
        {id: 5, name:'Sub 20',description:'Players under 20 years old', gender_id:1, season_id:1},
        {id: 6, name:'Sub 19',description:'Players under 19 years old', gender_id:1, season_id:1},
        {id: 7, name:'Sub 18',description:'Players under 18 years old', gender_id:1, season_id:1},
        {id: 8, name:'Sub 17',description:'Players under 17 years old', gender_id:1, season_id:1},
        {id: 9, name:'Sub 16',description:'Players under 16 years old', gender_id:1, season_id:1},
        {id: 10, name:'Sub 15',description:'Players under 15 years old', gender_id:1, season_id:1},
        {id: 11, name:'Sub 14',description:'Players under 14 years old', gender_id:1, season_id:1},
        {id: 12, name:'Infant',description:'Kids under 13 years old', gender_id:1, season_id:1}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
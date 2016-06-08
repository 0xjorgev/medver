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

    */

    knex('categories_types')
    .insert([
        {id: 1, name:'Professional',description:'Professional Futbol'},
        {id: 2, name:'Sub 23',description:'Players under 23 years old'},
        {id: 3, name:'Sub 22',description:'Players under 22 years old'},
        {id: 4, name:'Sub 21',description:'Players under 21 years old'},
        {id: 5, name:'Sub 20',description:'Players under 20 years old'},
        {id: 6, name:'Sub 19',description:'Players under 19 years old'},
        {id: 7, name:'Sub 18',description:'Players under 18 years old'},
        {id: 8, name:'Sub 17',description:'Players under 17 years old'},
        {id: 9, name:'Sub 16',description:'Players under 16 years old'},
        {id: 10, name:'Sub 15',description:'Players under 15 years old'},
        {id: 11, name:'Sub 14',description:'Players under 14 years old'},
        {id: 12, name:'Infant',description:'Kids under 13 years old'}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
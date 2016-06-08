exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),

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

    knex('categories')
    .insert([
        {id: 1, name:'Koopas',gender_id:1, season_id:1, classification_type_id:1, category_type_id:1},
        {id: 2, name:'Yoshis',gender_id:1, season_id:1, classification_type_id:1, category_type_id:2},
        {id: 3, name:'Kuppa Troopas',gender_id:1, season_id:1, classification_type_id:1, category_type_id:2}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
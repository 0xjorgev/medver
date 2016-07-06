
console.log(__filename.slice(__dirname.length + 1) + ' START')

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

    knex('categories').insert({name:'Koopas', gender_id:1, season_id:1, classification_type_id:1, category_type_id:1}),
    knex('categories').insert({name:'Yoshis', gender_id:1, season_id:1, classification_type_id:1, category_type_id:2}),
    knex('categories').insert({name:'Kuppa Troopas', gender_id:1, season_id:1, classification_type_id:1, category_type_id:2})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

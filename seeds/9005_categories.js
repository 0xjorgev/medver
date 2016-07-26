
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

    knex('categories').insert({inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Junior', gender_id:1, season_id:1, classification_type_id:1, category_type_id:1}),
    knex('categories').insert({inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Open', gender_id:1, season_id:1, classification_type_id:1, category_type_id:2}),
    knex('categories').insert({inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Master', gender_id:1, season_id:1, classification_type_id:1, category_type_id:2})
    // knex('categories').insert({name:'Atlanta Copa Coca-Cola Girls U-15',gender_id:2, season_id:2, classification_type_id:2, category_type_id:10})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')



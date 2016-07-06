
console.log(__filename.slice(__dirname.length + 1) + ' START')

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

    knex('categories_types').insert({name:'Professional',description:'Professional Futbol', minimum_value:0, maximum_value:99}),
    knex('categories_types').insert({name:'Sub 23',description:'Players under 23 years old', minimum_value:0, maximum_value:22}),
    knex('categories_types').insert({name:'Sub 22',description:'Players under 22 years old', minimum_value:0, maximum_value:21}),
    knex('categories_types').insert({name:'Sub 21',description:'Players under 21 years old', minimum_value:0, maximum_value:20}),
    knex('categories_types').insert({name:'Sub 20',description:'Players under 20 years old', minimum_value:0, maximum_value:19}),
    knex('categories_types').insert({name:'Sub 19',description:'Players under 19 years old', minimum_value:0, maximum_value:18}),
    knex('categories_types').insert({name:'Sub 18',description:'Players under 18 years old', minimum_value:0, maximum_value:17}),
    knex('categories_types').insert({name:'Sub 17',description:'Players under 17 years old', minimum_value:0, maximum_value:16}),
    knex('categories_types').insert({name:'Sub 16',description:'Players under 16 years old', minimum_value:0, maximum_value:15}),
    knex('categories_types').insert({name:'Sub 15',description:'Players under 15 years old', minimum_value:0, maximum_value:14}),
    knex('categories_types').insert({name:'Sub 14',description:'Players under 14 years old', minimum_value:0, maximum_value:13}),
    knex('categories_types').insert({name:'Infant',description:'Kids under 13 years old', minimum_value:0, maximum_value:12})
    )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

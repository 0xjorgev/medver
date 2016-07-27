
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories').del(),

    // Inserts seed entries

    /*
 other_minimum_participant  | integer                  | default 0
 other_maximum_participant  | integer                  | default 0
 player_minimum_participant | integer                  | default 0
 player_maximum_participant | integer                  | default 0
 coach_minimum_participant  | integer                  | default 0
 coach_maximum_participant  | integer                  | default 0
 team_quantity              | integer                  | default 0
 participant_minimum        | integer                  |
 participant_maximum        | integer                  |
    */

    knex('categories').insert({other_minimum_participant: 1, other_maximum_participant: 1, player_minimum_participant: 8, player_maximum_participant: 11, coach_minimum_participant: 1, coach_maximum_participant: 1, team_quantity: 6, participant_minimum: 5, participant_maximum: 12, inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Junior', gender_id:1, season_id:1, classification_type_id:1, category_type_id:12}),
    knex('categories').insert({other_minimum_participant: 1, other_maximum_participant: 1, player_minimum_participant: 8, player_maximum_participant: 11, coach_minimum_participant: 1, coach_maximum_participant: 1, team_quantity: 6, participant_minimum: 16, participant_maximum: 23, inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Open', gender_id:1, season_id:1, classification_type_id:1, category_type_id:1}),
    knex('categories').insert({other_minimum_participant: 1, other_maximum_participant: 1, player_minimum_participant: 8, player_maximum_participant: 11, coach_minimum_participant: 1, coach_maximum_participant: 1, team_quantity: 6, participant_minimum: 16, participant_maximum: 90, inscription_init_at: '03/01/2016', inscription_ends_at: '04/01/2016', is_published: true, name:'Master', gender_id:1, season_id:1, classification_type_id:1, category_type_id:2})
    // knex('categories').insert({name:'Atlanta Copa Coca-Cola Girls U-15',gender_id:2, season_id:2, classification_type_id:2, category_type_id:10})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')



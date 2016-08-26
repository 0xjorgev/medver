
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories_teams_players').del(),
    //Archies
     knex('categories_teams_players').insert({player_id:1, category_id:4, team_id:15, position:'',number:5}),
     knex('categories_teams_players').insert({player_id:2, category_id:4, team_id:15, position:'',number:14}),
     knex('categories_teams_players').insert({player_id:3, category_id:4, team_id:15, position:'',number:15}),
     knex('categories_teams_players').insert({player_id:4, category_id:4, team_id:15, position:'',number:7}),
     knex('categories_teams_players').insert({player_id:5, category_id:4, team_id:15, position:'',number:3}),
     knex('categories_teams_players').insert({player_id:6, category_id:4, team_id:15, position:'', number:9}),
     knex('categories_teams_players').insert({player_id:7, category_id:4, team_id:15, position:'', number:6}),
     knex('categories_teams_players').insert({player_id:8, category_id:4, team_id:15, position:'',number:1}),
     knex('categories_teams_players').insert({player_id:9, category_id:4, team_id:15, position:'',number:13}),
     knex('categories_teams_players').insert({player_id:10, category_id:4, team_id:15, position:'', number:8}),
     knex('categories_teams_players').insert({player_id:11, category_id:4, team_id:15, position:'',number:4}),
     knex('categories_teams_players').insert({player_id:12, category_id:4, team_id:15, position:'',number:11}),
     knex('categories_teams_players').insert({player_id:13, category_id:4, team_id:15, position:'',number:2}),
     knex('categories_teams_players').insert({player_id:14, category_id:4, team_id:15, position:'', number:12}),
     knex('categories_teams_players').insert({player_id:15, category_id:4, team_id:15, position:'', number:13}),
     knex('categories_teams_players').insert({player_id:16, category_id:4, team_id:15, position:'', number:10}),
     // Xolas
     knex('categories_teams_players').insert({player_id:17, category_id:4, team_id:10, position:'', number:6}),
     knex('categories_teams_players').insert({player_id:18, category_id:4, team_id:10, position:'', number:5}),
     knex('categories_teams_players').insert({player_id:19, category_id:4, team_id:10, position:'', number:4}),
     knex('categories_teams_players').insert({player_id:20, category_id:4, team_id:10, position:'', number:10}),
     knex('categories_teams_players').insert({player_id:21, category_id:4, team_id:10, position:'', number:3}),
     knex('categories_teams_players').insert({player_id:22, category_id:4, team_id:10, position:'', number:18}),
     knex('categories_teams_players').insert({player_id:23, category_id:4, team_id:10, position:'', number:13}),
     knex('categories_teams_players').insert({player_id:24, category_id:4, team_id:10, position:'', number:8}),
     knex('categories_teams_players').insert({player_id:25, category_id:4, team_id:10, position:'', number:1}),
     knex('categories_teams_players').insert({player_id:26, category_id:4, team_id:10, position:'', number:11}),
     knex('categories_teams_players').insert({player_id:27, category_id:4, team_id:10, position:'', number:2}),
     knex('categories_teams_players').insert({player_id:28, category_id:4, team_id:10, position:'', number:9}),
     knex('categories_teams_players').insert({player_id:29, category_id:4, team_id:10, position:'', number:7}),
     knex('categories_teams_players').insert({player_id:30, category_id:4, team_id:10, position:'', number:12}),
     knex('categories_teams_players').insert({player_id:31, category_id:4, team_id:10, position:'', number:17}),
     knex('categories_teams_players').insert({player_id:32, category_id:4, team_id:10, position:'', number:14})
    )
};
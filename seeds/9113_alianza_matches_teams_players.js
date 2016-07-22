console.log('0028 Matches Teams Players')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('matches_teams_players').del(),
    // Archies
     knex('matches_teams_players').insert({player_id:1, match_id:21, team_id:15, position:'',number:5}),
     knex('matches_teams_players').insert({player_id:2, match_id:21, team_id:15, position:'',number:14}),
     knex('matches_teams_players').insert({player_id:3, match_id:21, team_id:15, position:'',number:15}),
     knex('matches_teams_players').insert({player_id:4, match_id:21, team_id:15, position:'',number:7}),
     knex('matches_teams_players').insert({player_id:5, match_id:21, team_id:15, position:'',number:3}),
     knex('matches_teams_players').insert({player_id:6, match_id:21, team_id:15, position:'', number:9}),
     knex('matches_teams_players').insert({player_id:7, match_id:21, team_id:15, position:'', number:6}),
     knex('matches_teams_players').insert({player_id:8, match_id:21, team_id:15, position:'',number:1}),
     knex('matches_teams_players').insert({player_id:9, match_id:21, team_id:15, position:'',number:13}),
     knex('matches_teams_players').insert({player_id:10, match_id:21, team_id:15, position:'', number:8}),
     knex('matches_teams_players').insert({player_id:11, match_id:21, team_id:15, position:'',number:4}),
     knex('matches_teams_players').insert({player_id:12, match_id:21, team_id:15, position:'',number:11}),
     knex('matches_teams_players').insert({player_id:13, match_id:21, team_id:15, position:'',number:2}),
     knex('matches_teams_players').insert({player_id:14, match_id:21, team_id:15, position:'', number:12}),
     knex('matches_teams_players').insert({player_id:15, match_id:21, team_id:15, position:'', number:13}),
     knex('matches_teams_players').insert({player_id:16, match_id:21, team_id:15, position:'', number:10}),
     // Xolas
     knex('matches_teams_players').insert({player_id:17, match_id:21, team_id:10, position:'', number:6}),
     knex('matches_teams_players').insert({player_id:18, match_id:21, team_id:10, position:'', number:5}),
     knex('matches_teams_players').insert({player_id:19, match_id:21, team_id:10, position:'', number:4}),
     knex('matches_teams_players').insert({player_id:20, match_id:21, team_id:10, position:'', number:10}),
     knex('matches_teams_players').insert({player_id:21, match_id:21, team_id:10, position:'', number:3}),
     knex('matches_teams_players').insert({player_id:22, match_id:21, team_id:10, position:'', number:18}),
     knex('matches_teams_players').insert({player_id:23, match_id:21, team_id:10, position:'', number:13}),
     knex('matches_teams_players').insert({player_id:24, match_id:21, team_id:10, position:'', number:8}),
     knex('matches_teams_players').insert({player_id:25, match_id:21, team_id:10, position:'', number:1}),
     knex('matches_teams_players').insert({player_id:26, match_id:21, team_id:10, position:'', number:11}),
     knex('matches_teams_players').insert({player_id:27, match_id:21, team_id:10, position:'', number:2}),
     knex('matches_teams_players').insert({player_id:28, match_id:21, team_id:10, position:'', number:9}),
     knex('matches_teams_players').insert({player_id:29, match_id:21, team_id:10, position:'', number:7}),
     knex('matches_teams_players').insert({player_id:30, match_id:21, team_id:10, position:'', number:12}),
     knex('matches_teams_players').insert({player_id:31, match_id:21, team_id:10, position:'', number:17}),
     knex('matches_teams_players').insert({player_id:32, match_id:21, team_id:10, position:'', number:14})
    )
};
console.log('0028 Ok')

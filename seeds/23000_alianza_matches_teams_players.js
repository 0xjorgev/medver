console.log('0028 Matches Teams Players')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('matches_teams_players').del(),
    // Archies
     knex('matches_teams_players').insert({player_id:150, match_id:24, team_id:15, position:'',number:5}),
     knex('matches_teams_players').insert({player_id:151, match_id:24, team_id:15, position:'',number:14}),
     knex('matches_teams_players').insert({player_id:152, match_id:24, team_id:15, position:'',number:15}),
     knex('matches_teams_players').insert({player_id:153, match_id:24, team_id:15, position:'',number:7}),
     knex('matches_teams_players').insert({player_id:154, match_id:24, team_id:15, position:'',number:3}),
     knex('matches_teams_players').insert({player_id:155, match_id:24, team_id:15, position:'', number:9}),
     knex('matches_teams_players').insert({player_id:156, match_id:24, team_id:15, position:'', number:6}),
     knex('matches_teams_players').insert({player_id:157, match_id:24, team_id:15, position:'',number:1}),
     knex('matches_teams_players').insert({player_id:158, match_id:24, team_id:15, position:'',number:13}),
     knex('matches_teams_players').insert({player_id:159, match_id:24, team_id:15, position:'', number:8}),
     knex('matches_teams_players').insert({player_id:160, match_id:24, team_id:15, position:'',number:4}),
     knex('matches_teams_players').insert({player_id:161, match_id:24, team_id:15, position:'',number:11}),
     knex('matches_teams_players').insert({player_id:162, match_id:24, team_id:15, position:'',number:2}),
     knex('matches_teams_players').insert({player_id:163, match_id:24, team_id:15, position:'', number:12}),
     knex('matches_teams_players').insert({player_id:164, match_id:24, team_id:15, position:'', number:13}),
     knex('matches_teams_players').insert({player_id:165, match_id:24, team_id:15, position:'', number:10}),
     // Xolas
     knex('matches_teams_players').insert({player_id:72, match_id:24, team_id:10, position:'', number:6}),
     knex('matches_teams_players').insert({player_id:73, match_id:24, team_id:10, position:'', number:5}),
     knex('matches_teams_players').insert({player_id:74, match_id:24, team_id:10, position:'', number:4}),
     knex('matches_teams_players').insert({player_id:75, match_id:24, team_id:10, position:'', number:10}),
     knex('matches_teams_players').insert({player_id:76, match_id:24, team_id:10, position:'', number:3}),
     knex('matches_teams_players').insert({player_id:77, match_id:24, team_id:10, position:'', number:18}),
     knex('matches_teams_players').insert({player_id:78, match_id:24, team_id:10, position:'', number:13}),
     knex('matches_teams_players').insert({player_id:79, match_id:24, team_id:10, position:'', number:8}),
     knex('matches_teams_players').insert({player_id:80, match_id:24, team_id:10, position:'', number:1}),
     knex('matches_teams_players').insert({player_id:81, match_id:24, team_id:10, position:'', number:11}),
     knex('matches_teams_players').insert({player_id:82, match_id:24, team_id:10, position:'', number:2}),
     knex('matches_teams_players').insert({player_id:83, match_id:24, team_id:10, position:'', number:9}),
     knex('matches_teams_players').insert({player_id:84, match_id:24, team_id:10, position:'', number:7}),
     knex('matches_teams_players').insert({player_id:85, match_id:24, team_id:10, position:'', number:12}),
     knex('matches_teams_players').insert({player_id:86, match_id:24, team_id:10, position:'', number:17}),
     knex('matches_teams_players').insert({player_id:87, match_id:24, team_id:10, position:'', number:14})
    )
};
console.log('0028 Ok')

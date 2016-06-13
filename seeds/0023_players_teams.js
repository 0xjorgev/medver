
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('players_teams').del(),

    // Inserts seed entries
    //Team 1
    knex('players_teams').insert({player_id:1, team_id:4, number:1,position:'P'}),
    knex('players_teams').insert({player_id:2, team_id:4, number:5,position:'D'}),
    knex('players_teams').insert({player_id:3, team_id:4, number:7,position:'D'}),
    knex('players_teams').insert({player_id:4, team_id:4, number:8,position:'P'}),
    knex('players_teams').insert({player_id:5, team_id:4, number:2,position:'M'}),
    knex('players_teams').insert({player_id:6, team_id:4, number:10,position:'D'}),
    knex('players_teams').insert({player_id:7, team_id:4, number:9,position:'D'}),
    knex('players_teams').insert({player_id:8, team_id:4, number:3,position:'M'}),
    knex('players_teams').insert({player_id:9, team_id:4, number:11,position:'M'}),
    knex('players_teams').insert({player_id:10, team_id:4, number:4,position:'DEL'})

    // //Team 2
    // knex('players_teams').insert({player_id:11, team_id:5}),
    // knex('players_teams').insert({player_id:12, team_id:5}),
    // knex('players_teams').insert({player_id:13, team_id:5}),
    // knex('players_teams').insert({player_id:14, team_id:5}),
    // knex('players_teams').insert({player_id:15, team_id:5}),
    // knex('players_teams').insert({player_id:16, team_id:5}),
    // knex('players_teams').insert({player_id:17, team_id:5}),
    // knex('players_teams').insert({player_id:18, team_id:5}),
    // knex('players_teams').insert({player_id:19, team_id:5}),
    // knex('players_teams').insert({player_id:20, team_id:5}),
    // knex('players_teams').insert({player_id:21, team_id:5}),
    // knex('players_teams').insert({player_id:22, team_id:5})

    );
};
    // //Team 3
    // knex('players_teams').insert({player_id:23, team_id:6}),
    // knex('players_teams').insert({player_id:24, team_id:6}),
    // knex('players_teams').insert({player_id:25, team_id:6}),
    // knex('players_teams').insert({player_id:26, team_id:6}),
    // knex('players_teams').insert({player_id:27, team_id:6}),
    // knex('players_teams').insert({player_id:28, team_id:6}),
    // knex('players_teams').insert({player_id:29, team_id:6}),
    // knex('players_teams').insert({player_id:30, team_id:6}),
    // knex('players_teams').insert({player_id:31, team_id:6}),
    // knex('players_teams').insert({player_id:32, team_id:6}),
    // knex('players_teams').insert({player_id:33, team_id:6}),
    // knex('players_teams').insert({player_id:34, team_id:6}),
    // //Team 4
    // knex('players_teams').insert({player_id:35, team_id:7}),
    // knex('players_teams').insert({player_id:36, team_id:7}),
    // knex('players_teams').insert({player_id:37, team_id:7}),
    // knex('players_teams').insert({player_id:38, team_id:7}),
    // knex('players_teams').insert({player_id:39, team_id:7}),
    // knex('players_teams').insert({player_id:40, team_id:7}),
    // knex('players_teams').insert({player_id:41, team_id:7}),
    // knex('players_teams').insert({player_id:42, team_id:7}),
    // knex('players_teams').insert({player_id:43, team_id:7}),
    // knex('players_teams').insert({player_id:44, team_id:7}),
    // knex('players_teams').insert({player_id:45, team_id:7}),
    // //Team 5
    // knex('players_teams').insert({player_id:46, team_id:8}),
    // knex('players_teams').insert({player_id:47, team_id:8}),
    // knex('players_teams').insert({player_id:48, team_id:8}),
    // knex('players_teams').insert({player_id:49, team_id:8}),
    // knex('players_teams').insert({player_id:50, team_id:8}),
    // knex('players_teams').insert({player_id:51, team_id:8}),
    // knex('players_teams').insert({player_id:52, team_id:8}),
    // knex('players_teams').insert({player_id:53, team_id:8}),
    // knex('players_teams').insert({player_id:54, team_id:8}),
    // knex('players_teams').insert({player_id:55, team_id:8}),
    // knex('players_teams').insert({player_id:56, team_id:8}),
    // knex('players_teams').insert({player_id:57, team_id:8}),
    // //Team 6
    // knex('players_teams').insert({player_id:58, team_id:9}),
    // knex('players_teams').insert({player_id:59, team_id:9}),
    // knex('players_teams').insert({player_id:60, team_id:9}),
    // knex('players_teams').insert({player_id:61, team_id:9}),
    // knex('players_teams').insert({player_id:62, team_id:9}),
    // knex('players_teams').insert({player_id:63, team_id:9}),
    // knex('players_teams').insert({player_id:64, team_id:9}),
    // knex('players_teams').insert({player_id:65, team_id:9}),
    // knex('players_teams').insert({player_id:66, team_id:9}),
    // knex('players_teams').insert({player_id:67, team_id:9})

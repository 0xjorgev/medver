console.log('9000 events_matches_players seed')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('events_matches_players').del(),

    knex('events_matches_players').insert({match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:5, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
    knex('events_matches_players').insert({match_id:5, event_id:2, player_in:2, player_out:null, instant:5, team_id:4  }),
    knex('events_matches_players').insert({match_id:5, event_id:3, player_in:16, player_out:null, instant:10, team_id:5  }),
    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:16, player_out:null,instant:32, team_id:5  }),
    knex('events_matches_players').insert({match_id:5, event_id:5, player_in:17, player_out:16, instant:40, team_id:5  }),
    knex('events_matches_players').insert({match_id:5, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:5, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:5, event_id:2, player_in:null, player_out:7, instant:50, team_id:4  }),
    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:5, player_out:null, instant:63, team_id:4  }),
    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:5, player_out:null, instant:72, team_id:4  }),
    knex('events_matches_players').insert({match_id:5, event_id:10, player_in:5, player_out:null, instant:90, team_id:4  }),
    knex('events_matches_players').insert({match_id:5, event_id:8, player_in:null, player_out:null, instant:90, team_id:null })

)}
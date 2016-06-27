  console.log('9000 Events Matches');
    //Deletes ALL existing entries

    exports.seed = function(knex, Promise) {
      return Promise.join(

    // ==========================================================================
    // Match 1
    // ==========================================================================
    knex('events_matches_players').insert({match_id:1, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:1, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:1, event_id:1, player_in:16, player_out:null, instant:32, team_id:2 }),

    //middle
    knex('events_matches_players').insert({match_id:1, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:1, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:1, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:1, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //==========================================================================
    // Match 2
    //==========================================================================
    knex('events_matches_players').insert({match_id:2, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:2, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:2, event_id:1, player_in:16, player_out:null, instant:32, team_id:3 }),
    knex('events_matches_players').insert({match_id:2, event_id:1, player_in:16, player_out:null, instant:33, team_id:4 }),
    knex('events_matches_players').insert({match_id:2, event_id:1, player_in:16, player_out:null, instant:34, team_id:4 }),

    //middle
    knex('events_matches_players').insert({match_id:2, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:2, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:2, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:2, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //==========================================================================
    // Match 3
    //==========================================================================
    knex('events_matches_players').insert({match_id:3, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:3, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:3, event_id:1, player_in:16, player_out:null, instant:34, team_id:1 }),

    //middle
    knex('events_matches_players').insert({match_id:3, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:3, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:3, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:3, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //==========================================================================
    // Match 4
    //==========================================================================
    knex('events_matches_players').insert({match_id:4, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:4, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:4, event_id:1, player_in:16, player_out:null, instant:34, team_id:2 }),
    knex('events_matches_players').insert({match_id:4, event_id:1, player_in:16, player_out:null, instant:34, team_id:2 }),

    //middle
    knex('events_matches_players').insert({match_id:4, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:4, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:4, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:4, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //==========================================================================
    // Match 5
    //==========================================================================
    knex('events_matches_players').insert({match_id:5, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:5, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:16, player_out:null, instant:34, team_id:1 }),
    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:16, player_out:null, instant:34, team_id:1 }),
    knex('events_matches_players').insert({match_id:5, event_id:1, player_in:16, player_out:null, instant:34, team_id:3 }),

    //middle
    knex('events_matches_players').insert({match_id:5, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:5, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:5, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:5, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),


    //==========================================================================
    // Match 6
    //==========================================================================
    knex('events_matches_players').insert({match_id:6, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:6, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:6, event_id:1, player_in:16, player_out:null, instant:34, team_id:2 }),
    knex('events_matches_players').insert({match_id:6, event_id:1, player_in:16, player_out:null, instant:34, team_id:4 }),

    //middle
    knex('events_matches_players').insert({match_id:6, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:6, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:6, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:6, event_id:8, player_in:null, player_out:null, instant:90, team_id:null })
  )
}
console.log('9000 OK');

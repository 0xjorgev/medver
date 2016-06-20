
    //==========================================================================
    // event types
    //==========================================================================

    // {id:1, img_url:'', name:'Gol', description:'Score the rival with one gol!', level:1, increments_by:1, subdiscipline_id:, team_id: 2}),
    // {id:2, img_url:'', name:'Red Card', description:'Game amonstation for bad behaviour on the field, requires player expulsion', level:1, increments_by:1, subdiscipline_id:2}),
    // {id:3, img_url:'', name:'Yellow Card', description:'Game amonstation for bad behaviour on the field', level:1, increments_by:1, subdiscipline_id:2}),
    // {id:4, img_url:'', name:'Auto Gol', description:'Scored agains your own team', level:1, increments_by:1, subdiscipline_id:2}),
    // {id:5, img_url:'', name:'Change', description:'Requires a player to leave the game and be sustituted by another team player', level:1, increments_by:1, subdiscipline_id:2}),
    // {id:6, img_url:'', name:'Penalty', description:'Requires a player to leave the game and be sustituted by another team player', level:1, increments_by:1, subdiscipline_id:2}),
    // {id:7, img_url:'', name:'Start Match', description:'Match started', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:8, img_url:'', name:'Match Ends', description:'Match ends', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:9, img_url:'', name:'Regular term starts', description:'Regular term starts', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:10, img_url:'', name:'Regular term finish', description:'Regular term finish', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:11, img_url:'', name:'Extra Time', description:'Assigned by the referees to avoid the accumulated time on the field while playing', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:12, img_url:'', name:'Extra Term starts', description:'When the match requieres a match winner there migth be able to allow 2 extra terms to find one', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:13, img_url:'', name:'Extra Term finish', description:'The end of the extra term time', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:14, img_url:'', name:'Penalty round', description:'When the match requieres a match winner', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:15, img_url:'', name:'Match suspended', description:'Match started but not finished', level:2, increments_by:1, subdiscipline_id:2}),
    // {id:16, img_url:'', name:'Match Cancel', description:'Match not played', level:2, increments_by:1, subdiscipline_id:2})


console.log('9000 seeding events_matches_players')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('events_matches_players').del(),

    //==========================================================================
    // Match 1
    //==========================================================================
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

)}

console.log('9000 OK')
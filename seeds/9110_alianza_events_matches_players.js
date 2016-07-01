
console.log(__filename.slice(__dirname.length + 1) + ' START')


    //Deletes ALL existing entries

    exports.seed = function(knex, Promise) {
      return Promise.join(

    //==========================================================================
    // Eagles - Academy Primera Ronda - Grupo A
    //==========================================================================
    knex('events_matches_players').insert({match_id:7, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:7, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:7, event_id:1, player_in:111, player_out:null, instant:35, team_id:12 }),
    knex('events_matches_players').insert({match_id:7, event_id:1, player_in:148, player_out:null, instant:43, team_id:14 }),

        //middle
    knex('events_matches_players').insert({match_id:7, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:7, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:7, event_id:1, player_in:134, player_out:null, instant:48, team_id:14 }),

        //end match
    knex('events_matches_players').insert({match_id:7, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:7, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //======================================================
    //  Xolas Archi Primera Ronda - Grupo A
    //======================================================
    knex('events_matches_players').insert({match_id:9, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:9, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:9, event_id:1, player_in:159, player_out:null, instant:5, team_id:15 }),

    knex('events_matches_players').insert({match_id:9, event_id:1, player_in:79, player_out:null, instant:10, team_id:10 }),
    knex('events_matches_players').insert({match_id:9, event_id:1, player_in:86, player_out:null, instant:15, team_id:10 }),

    //middle
    knex('events_matches_players').insert({match_id:9, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:9, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:9, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:9, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //==========================================================================
    // Archi - Sur Carolina Primera Ronda - Grupo A
    //==========================================================================
    knex('events_matches_players').insert({match_id:14, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:14, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),

    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:163, player_out:null, instant:1, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:152, player_out:null, instant:7, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:152, player_out:null, instant:11, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:163, player_out:null, instant:16, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:153, player_out:null, instant:25, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:150, player_out:null, instant:32, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:151, player_out:null, instant:36, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:150, player_out:null, instant:38, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:165, player_out:null, instant:41, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:165, player_out:null, instant:42, team_id:15 }),

        //middle
    knex('events_matches_players').insert({match_id:14, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:14, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:165, player_out:null, instant:47, team_id:15 }),
    knex('events_matches_players').insert({match_id:14, event_id:1, player_in:165, player_out:null, instant:50, team_id:15 }),

        //end match
    knex('events_matches_players').insert({match_id:14, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:14, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),


    //======================================================
    //  Costa Chica - Fusion Primera Ronda - Grupo A
    //======================================================
    knex('events_matches_players').insert({match_id:8, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:8, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
    //GOL
    knex('events_matches_players').insert({match_id:8, event_id:1, player_in:90, player_out:null, instant:5, team_id:11 }),
    knex('events_matches_players').insert({match_id:8, event_id:1, player_in:90, player_out:null, instant:10, team_id:11 }),
    knex('events_matches_players').insert({match_id:8, event_id:1, player_in:90, player_out:null, instant:15, team_id:11 }),

    //middle
    knex('events_matches_players').insert({match_id:8, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:8, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    //end match
    knex('events_matches_players').insert({match_id:8, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:8, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

    //======================================================
    //  Pedro Espinoza - Sur Carolina Primera Ronda - Grupo A
    //======================================================
    knex('events_matches_players').insert({match_id:10, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
    knex('events_matches_players').insert({match_id:10, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
    //GOL
    knex('events_matches_players').insert({match_id:10, event_id:1, player_in:130, player_out:null, instant:5, team_id:13 }),
    knex('events_matches_players').insert({match_id:10, event_id:1, player_in:130, player_out:null, instant:12, team_id:13 }),

    //middle
    knex('events_matches_players').insert({match_id:10, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
    knex('events_matches_players').insert({match_id:10, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

    knex('events_matches_players').insert({match_id:10, event_id:1, player_in:130, player_out:null, instant:49, team_id:13 }),

    //end match
    knex('events_matches_players').insert({match_id:10, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
    knex('events_matches_players').insert({match_id:10, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Eagles 2 - Costa Chica 1 Primera Ronda - Grupo A
  //======================================================
  knex('events_matches_players').insert({match_id:11, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:11, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:11, event_id:1, player_in:91, player_out:null, instant:5, team_id:11 }),

  //middle
  knex('events_matches_players').insert({match_id:11, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:11, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:11, event_id:1, player_in:107, player_out:null, instant:47, team_id:12 }),
  knex('events_matches_players').insert({match_id:11, event_id:1, player_in:107, player_out:null, instant:63, team_id:12 }),

  //end match
  knex('events_matches_players').insert({match_id:11, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:11, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Academy 3 - Fusion 0 Primera Ronda - Grupo B
  //======================================================
  knex('events_matches_players').insert({match_id:12, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:12, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:12, event_id:1, player_in:138, player_out:null, instant:5, team_id:14 }),

  //middle
  knex('events_matches_players').insert({match_id:12, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:12, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:12, event_id:1, player_in:138, player_out:null, instant:47, team_id:14 }),
  knex('events_matches_players').insert({match_id:12, event_id:1, player_in:138, player_out:null, instant:63, team_id:14 }),

  //end match
  knex('events_matches_players').insert({match_id:12, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:12, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Xolas 3 - Pedro Espinoza 0 Primera Ronda - Grupo B
  //======================================================
  knex('events_matches_players').insert({match_id:13, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:13, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:13, event_id:1, player_in:75, player_out:null, instant:5, team_id:10 }),

  //middle
  knex('events_matches_players').insert({match_id:13, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:13, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:13, event_id:1, player_in:75, player_out:null, instant:47, team_id:10 }),
  knex('events_matches_players').insert({match_id:13, event_id:1, player_in:75, player_out:null, instant:63, team_id:10 }),

  //end match
  knex('events_matches_players').insert({match_id:13, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:13, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Fusion 0 - Eagles 3 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:15, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:15, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:15, event_id:1, player_in:107, player_out:null, instant:5, team_id:12 }),

  //middle
  knex('events_matches_players').insert({match_id:15, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:15, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:15, event_id:1, player_in:107, player_out:null, instant:47, team_id:12 }),
  knex('events_matches_players').insert({match_id:15, event_id:1, player_in:107, player_out:null, instant:63, team_id:12 }),

  //end match
  knex('events_matches_players').insert({match_id:15, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:15, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Costa Chica 1 - Academia 1 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:16, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:16, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:16, event_id:1, player_in:91, player_out:null, instant:5, team_id:11 }),

  //middle
  knex('events_matches_players').insert({match_id:16, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:16, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:16, event_id:1, player_in:138, player_out:null, instant:63, team_id:14 }),

  //end match
  knex('events_matches_players').insert({match_id:16, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:16, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Sur Carolina 0 - Xolas 3 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:17, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:17, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:17, event_id:1, player_in:72, player_out:null, instant:5, team_id:10 }),

  //middle
  knex('events_matches_players').insert({match_id:17, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:17, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:17, event_id:1, player_in:75, player_out:null, instant:51, team_id:10 }),
  knex('events_matches_players').insert({match_id:17, event_id:1, player_in:76, player_out:null, instant:74, team_id:10 }),

  //end match
  knex('events_matches_players').insert({match_id:17, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:17, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Pedro Espinza 0 - Archi 3 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:18, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:18, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:18, event_id:1, player_in:155, player_out:null, instant:5, team_id:15 }),

  //middle
  knex('events_matches_players').insert({match_id:18, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:18, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:18, event_id:1, player_in:156, player_out:null, instant:47, team_id:15 }),
  knex('events_matches_players').insert({match_id:18, event_id:1, player_in:157, player_out:null, instant:63, team_id:15 }),

  //end match
  knex('events_matches_players').insert({match_id:18, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:18, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Academia 1 - Archi 4 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:19, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:19, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:19, event_id:1, player_in:155, player_out:null, instant:5, team_id:15 }),
  knex('events_matches_players').insert({match_id:19, event_id:1, player_in:156, player_out:null, instant:27, team_id:15 }),
  knex('events_matches_players').insert({match_id:19, event_id:1, player_in:138, player_out:null, instant:42, team_id:14 }),
  //middle
  knex('events_matches_players').insert({match_id:19, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:19, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

  knex('events_matches_players').insert({match_id:19, event_id:1, player_in:157, player_out:null, instant:47, team_id:15 }),
  knex('events_matches_players').insert({match_id:19, event_id:1, player_in:156, player_out:null, instant:53, team_id:15 }),

  //end match
  knex('events_matches_players').insert({match_id:19, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:19, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Xolas 7 - Eagles 0 Segunda Ronda
  //======================================================
  knex('events_matches_players').insert({match_id:20, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:20, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:75, player_out:null, instant:5, team_id:10 }),
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:73, player_out:null, instant:27, team_id:10 }),
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:74, player_out:null, instant:42, team_id:10 }),
  //middle
  knex('events_matches_players').insert({match_id:20, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:20, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:81, player_out:null, instant:47, team_id:10 }),
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:82, player_out:null, instant:53, team_id:10 }),
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:75, player_out:null, instant:79, team_id:10 }),
  knex('events_matches_players').insert({match_id:20, event_id:1, player_in:75, player_out:null, instant:88, team_id:10 }),

  //end match
  knex('events_matches_players').insert({match_id:20, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:20, event_id:8, player_in:null, player_out:null, instant:90, team_id:null }),

  //======================================================
  //  Archi 0 - Cholas 1 Final
  //======================================================
  knex('events_matches_players').insert({match_id:21, event_id:7, player_in:null, player_out:null, instant:0, team_id:null }),
  knex('events_matches_players').insert({match_id:21, event_id:9, player_in:null, player_out:null, instant:0, team_id:null  }),
  //GOL
  knex('events_matches_players').insert({match_id:21, event_id:1, player_in:75, player_out:null, instant:43, team_id:10 }),

  //middle
  knex('events_matches_players').insert({match_id:21, event_id:10, player_in:null, player_out:null,instant:45, team_id:null  }),
  knex('events_matches_players').insert({match_id:21, event_id:9, player_in:null, player_out:null, instant:45, team_id:null  }),

  //end match
  knex('events_matches_players').insert({match_id:21, event_id:10, player_in:null, player_out:null, instant:90, team_id:null  }),
  knex('events_matches_players').insert({match_id:21, event_id:8, player_in:null, player_out:null, instant:90, team_id:null })
)
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
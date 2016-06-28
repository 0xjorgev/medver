
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Matchs Data
    //==========================================================================
    /*
      Eagles            12
      XOLAS             10
      PEDRO Espinoza    17
      ACADEMIA United   14
      ARCHI             15
      FUSION            16
      COSTA Chica       11
      SUR Carolina      13

      id: 12, name: 'Primera Ronda'    Grupo A
      id: 13, name: 'Primera Ronda'    Grupo B
      id: 14, name: 'Segunda Ronda'    Grupo A
      id: 15, name: 'Segunda Ronda'    Grupo B
      id: 16, name: 'Ronda Semifinal   Semi
      id: 17, name: 'Ronda Final'      Final

    */
    //All in the same round???? NOP --> Round by group
    knex('matches').insert({id:10, location: 'FIELD 3', home_team_id:12, visitor_team_id:14, round_id:12, home_team_score:1, visitor_team_score:2 ,date:'2016-06-11 12:20:56.576272-05:00'}),
    knex('matches').insert({id:11, location: 'FIELD 4', home_team_id:11, visitor_team_id:16, round_id:12, home_team_score:3, visitor_team_score:0 ,date:'2016-06-11 12:20:56.576272-05:00'}),

    //======================================================
    //  Xolas Archi Primera Ronda - Grupo A
    //======================================================

    knex('matches').insert({id:12, location: 'FIELD 3', home_team_id:10, visitor_team_id:15, round_id:13, home_team_score:2, visitor_team_score:1 ,date:'2016-06-11 13:25:56.576272-05:00'}),
    knex('matches').insert({id:13, location: 'FIELD 4', home_team_id:17, visitor_team_id:13, round_id:13, home_team_score:0, visitor_team_score:3 ,date:'2016-06-11 13:25:56.576272-05:00'}),
    knex('matches').insert({id:14, location: 'FIELD 2', home_team_id:12, visitor_team_id:11, round_id:12, home_team_score:2, visitor_team_score:1 ,date:'2016-06-11 18:50:56.576272-05:00'}),
    knex('matches').insert({id:15, location: 'FIELD 3', home_team_id:14, visitor_team_id:16, round_id:12, home_team_score:3, visitor_team_score:0 ,date:'2016-06-11 18:50:56.576272-05:00'}),
    knex('matches').insert({id:16, location: 'FIELD 4', home_team_id:10, visitor_team_id:17, round_id:13, home_team_score:3, visitor_team_score:0 ,date:'2016-06-11 18:50:56.576272-05:00'}),
    knex('matches').insert({id:17, location: 'FIELD 5', home_team_id:15, visitor_team_id:13, round_id:13, home_team_score:12, visitor_team_score:0 ,date:'2016-06-11 18:50:56.576272-05:00'}),
    //Segunda Jornada
    knex('matches').insert({id:18, location: 'FIELD 3', home_team_id:16, visitor_team_id:12, round_id:14, home_team_score:0, visitor_team_score:3 ,date:'2016-06-12 12:20:56.576272-05:00'}),
    knex('matches').insert({id:19, location: 'FIELD 4', home_team_id:11, visitor_team_id:14, round_id:14, home_team_score:1, visitor_team_score:1 ,date:'2016-06-12 12:20:56.576272-05:00'}),
    knex('matches').insert({id:20, location: 'FIELD 5', home_team_id:13, visitor_team_id:10, round_id:15, home_team_score:0, visitor_team_score:3 ,date:'2016-06-12 12:20:56.576272-05:00'}),
    knex('matches').insert({id:21, location: 'FIELD 6', home_team_id:17, visitor_team_id:15, round_id:15, home_team_score:0, visitor_team_score:3 ,date:'2016-06-12 12:20:56.576272-05:00'}),
    //Semifinal
    knex('matches').insert({id:22, location: 'FIELD 3', home_team_id:14, visitor_team_id:15, round_id:16, home_team_score:1, visitor_team_score:4 ,date:'2016-06-12 15:35:56.576272-05:00'}),
    knex('matches').insert({id:23, location: 'FIELD 4', home_team_id:10, visitor_team_id:12, round_id:16, home_team_score:7, visitor_team_score:0 ,date:'2016-06-12 15:35:56.576272-05:00'}),
    //Final
    knex('matches').insert({id:24, location: 'FIELD 4', home_team_id:15, visitor_team_id:10, round_id:17, home_team_score:0, visitor_team_score:1 ,date:'2016-06-12 17:45:56.576272-05:00'})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
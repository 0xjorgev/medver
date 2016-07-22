
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Players_Teams
    //==========================================================================
    knex('players_teams').insert({player_id:68, team_id:10, number:6, position:''}),
    knex('players_teams').insert({player_id:69, team_id:10, number:5, position:''}),
    knex('players_teams').insert({player_id:70, team_id:10, number:4, position:''}),
    knex('players_teams').insert({player_id:71, team_id:10, number:10, position:''}),
    knex('players_teams').insert({player_id:72, team_id:10, number:3, position:''}),
    knex('players_teams').insert({player_id:73, team_id:10, number:18, position:''}),
    knex('players_teams').insert({player_id:74, team_id:10, number:13, position:''}),
    knex('players_teams').insert({player_id:75, team_id:10, number:8, position:''}),
    knex('players_teams').insert({player_id:76, team_id:10, number:1, position:''}),
    knex('players_teams').insert({player_id:77, team_id:10, number:11, position:''}),
    knex('players_teams').insert({player_id:78, team_id:10, number:2, position:''}),
    knex('players_teams').insert({player_id:79, team_id:10, number:9, position:''}),
    knex('players_teams').insert({player_id:80, team_id:10, number:7, position:''}),
    knex('players_teams').insert({player_id:81, team_id:10, number:12, position:''}),
    knex('players_teams').insert({player_id:82, team_id:10, number:17, position:''}),
    knex('players_teams').insert({player_id:83, team_id:10, number:14, position:''}),
    //==========================================================================
    // Team 2: Coesta Checa - Players
    //==========================================================================
    knex('players_teams').insert({player_id:84, team_id:11, number:13, position:''}),
    knex('players_teams').insert({player_id:85, team_id:11, number:9, position:''}),
    knex('players_teams').insert({player_id:86, team_id:11, number:4, position:''}),
    knex('players_teams').insert({player_id:87, team_id:11, number:10, position:''}),
    knex('players_teams').insert({player_id:88, team_id:11, number:14, position:''}),
    knex('players_teams').insert({player_id:89, team_id:11, number:3, position:''}),
    knex('players_teams').insert({player_id:90, team_id:11, number:8, position:''}),
    knex('players_teams').insert({player_id:91, team_id:11, number:15, position:''}),
    knex('players_teams').insert({player_id:92, team_id:11, number:18, position:''}),
    knex('players_teams').insert({player_id:93, team_id:11, number:1, position:''}),
    knex('players_teams').insert({player_id:94, team_id:11, number:6, position:''}),
    knex('players_teams').insert({player_id:95, team_id:11, number:17, position:''}),
    knex('players_teams').insert({player_id:96, team_id:11, number:2, position:''}),
    knex('players_teams').insert({player_id:97, team_id:11, number:12, position:''}),
    knex('players_teams').insert({player_id:98, team_id:11, number:7, position:''}),
    knex('players_teams').insert({player_id:99, team_id:11, number:5, position:''}),
    knex('players_teams').insert({player_id:100, team_id:11, number:11, position:''}),
    knex('players_teams').insert({player_id:101, team_id:11, number:16, position:''}),
    //==========================================================================
    // Team 3: Norcross Eagles - Teams
    //==========================================================================
    knex('players_teams').insert({player_id:102, team_id:12, number:11, position:''}),
    knex('players_teams').insert({player_id:103, team_id:12, number:9, position:''}),
    knex('players_teams').insert({player_id:104, team_id:12, number:15, position:''}),
    knex('players_teams').insert({player_id:105, team_id:12, number:14, position:''}),
    knex('players_teams').insert({player_id:106, team_id:12, number:16, position:''}),
    knex('players_teams').insert({player_id:107, team_id:12, number:5, position:''}),
    knex('players_teams').insert({player_id:108, team_id:12, number:18, position:''}),
    knex('players_teams').insert({player_id:109, team_id:12, number:1, position:''}),
    knex('players_teams').insert({player_id:110, team_id:12, number:4, position:''}),
    knex('players_teams').insert({player_id:111, team_id:12, number:13, position:''}),
    knex('players_teams').insert({player_id:112, team_id:12, number:7, position:''}),
    knex('players_teams').insert({player_id:113, team_id:12, number:12, position:''}),
    knex('players_teams').insert({player_id:114, team_id:12, number:17, position:''}),
    knex('players_teams').insert({player_id:115, team_id:12, number:3, position:''}),
    knex('players_teams').insert({player_id:116, team_id:12, number:1, position:''}),
    knex('players_teams').insert({player_id:117, team_id:12, number:6, position:''}),

    //==========================================================================
    // Team 4: Sur Carolina (Del) - Teams
    //==========================================================================
    knex('players_teams').insert({player_id:118, team_id:13, number:14, position:''}),
    knex('players_teams').insert({player_id:119, team_id:13, number:17, position:''}),
    knex('players_teams').insert({player_id:120, team_id:13, number:7, position:''}),
    knex('players_teams').insert({player_id:121, team_id:13, number:8, position:''}),
    knex('players_teams').insert({player_id:122, team_id:13, number:1, position:''}),
    knex('players_teams').insert({player_id:123, team_id:13, number:4, position:''}),
    knex('players_teams').insert({player_id:124, team_id:13, number:5, position:''}),
    knex('players_teams').insert({player_id:125, team_id:13, number:2, position:''}),
    knex('players_teams').insert({player_id:126, team_id:13, number:9, position:''}),
    knex('players_teams').insert({player_id:127, team_id:13, number:10, position:''}),
    knex('players_teams').insert({player_id:128, team_id:13, number:3, position:''}),
    knex('players_teams').insert({player_id:129, team_id:13, number:6, position:''}),
    //==========================================================================
    // Team 5: United Academia - Teams
    //==========================================================================
    knex('players_teams').insert({player_id:130, team_id:14, number:2, position:''}),
    knex('players_teams').insert({player_id:131, team_id:14, number:9, position:''}),
    knex('players_teams').insert({player_id:132, team_id:14, number:12, position:''}),
    knex('players_teams').insert({player_id:133, team_id:14, number:5, position:''}),
    knex('players_teams').insert({player_id:134, team_id:14, number:10, position:''}),
    knex('players_teams').insert({player_id:135, team_id:14, number:13, position:''}),
    knex('players_teams').insert({player_id:136, team_id:14, number:1, position:''}),
    knex('players_teams').insert({player_id:137, team_id:14, number:14, position:''}),
    knex('players_teams').insert({player_id:138, team_id:14, number:6, position:''}),
    knex('players_teams').insert({player_id:139, team_id:14, number:11, position:''}),
    knex('players_teams').insert({player_id:140, team_id:14, number:3, position:''}),
    knex('players_teams').insert({player_id:141, team_id:14, number:4, position:''}),
    knex('players_teams').insert({player_id:142, team_id:14, number:15, position:''}),
    knex('players_teams').insert({player_id:143, team_id:14, number:7, position:''}),
    knex('players_teams').insert({player_id:144, team_id:14, number:17, position:''}),
    knex('players_teams').insert({player_id:145, team_id:14, number:8, position:''}),

    //==========================================================================
    // Team 6: Archi - Teams
    //==========================================================================

    knex('players_teams').insert({player_id:146, team_id:15, number:5, position:''}),
    knex('players_teams').insert({player_id:147, team_id:15, number:14, position:''}),
    knex('players_teams').insert({player_id:148, team_id:15, number:15, position:''}),
    knex('players_teams').insert({player_id:149, team_id:15, number:7, position:''}),
    knex('players_teams').insert({player_id:150, team_id:15, number:3, position:''}),
    knex('players_teams').insert({player_id:151, team_id:15, number:9, position:''}),
    knex('players_teams').insert({player_id:152, team_id:15, number:6, position:''}),
    knex('players_teams').insert({player_id:153, team_id:15, number:1, position:''}),
    knex('players_teams').insert({player_id:154, team_id:15, number:13, position:''}),
    knex('players_teams').insert({player_id:155, team_id:15, number:8, position:''}),
    knex('players_teams').insert({player_id:156, team_id:15, number:4, position:''}),
    knex('players_teams').insert({player_id:157, team_id:15, number:11, position:''}),
    knex('players_teams').insert({player_id:158, team_id:15, number:2, position:''}),
    knex('players_teams').insert({player_id:159, team_id:15, number:12, position:''}),
    knex('players_teams').insert({player_id:160, team_id:15, number:13, position:''}),
    knex('players_teams').insert({player_id:161, team_id:15, number:10, position:''}),

    //==========================================================================
    // Team 7: Archi - Teams
    //==========================================================================
    knex('players_teams').insert({player_id:162, team_id:16, number:5, position:''}),
    knex('players_teams').insert({player_id:163, team_id:16, number:14, position:''}),
    knex('players_teams').insert({player_id:164, team_id:16, number:15, position:''}),
    knex('players_teams').insert({player_id:165, team_id:16, number:7, position:''}),
    knex('players_teams').insert({player_id:166, team_id:16, number:3, position:''}),
    knex('players_teams').insert({player_id:167, team_id:16, number:9, position:''}),
    knex('players_teams').insert({player_id:168, team_id:16, number:6, position:''}),
    knex('players_teams').insert({player_id:169, team_id:16, number:1, position:''}),
    knex('players_teams').insert({player_id:170, team_id:16, number:13, position:''}),
    knex('players_teams').insert({player_id:171, team_id:16, number:8, position:''}),
    knex('players_teams').insert({player_id:172, team_id:16, number:4, position:''}),
    knex('players_teams').insert({player_id:173, team_id:16, number:11, position:''}),
    knex('players_teams').insert({player_id:174, team_id:16, number:2, position:''}),
    knex('players_teams').insert({player_id:175, team_id:16, number:12, position:''}),
    knex('players_teams').insert({player_id:176, team_id:16, number:13, position:''}),
    knex('players_teams').insert({player_id:177, team_id:16, number:10, position:''}),

    //==========================================================================
    // Team 8: Archi - Teams
    //==========================================================================
    knex('players_teams').insert({player_id:178, team_id:17, number:11, position:''}),
    knex('players_teams').insert({player_id:179, team_id:17, number:9, position:''}),
    knex('players_teams').insert({player_id:180, team_id:17, number:15, position:''}),
    knex('players_teams').insert({player_id:181, team_id:17, number:14, position:''}),
    knex('players_teams').insert({player_id:182, team_id:17, number:16, position:''}),
    knex('players_teams').insert({player_id:183, team_id:17, number:5, position:''}),
    knex('players_teams').insert({player_id:184, team_id:17, number:18, position:''}),
    knex('players_teams').insert({player_id:185, team_id:17, number:1, position:''}),
    knex('players_teams').insert({player_id:186, team_id:17, number:4, position:''}),
    knex('players_teams').insert({player_id:187, team_id:17, number:13, position:''}),
    knex('players_teams').insert({player_id:188, team_id:17, number:7, position:''}),
    knex('players_teams').insert({player_id:189, team_id:17, number:12, position:''}),
    knex('players_teams').insert({player_id:190, team_id:17, number:17, position:''}),
    knex('players_teams').insert({player_id:191, team_id:17, number:3, position:''}),
    knex('players_teams').insert({player_id:192, team_id:17, number:1, position:''}),
    knex('players_teams').insert({player_id:193, team_id:17, number:6, position:''})
  )
}

console.log(__filename.slice(__dirname.length + 1) + ' OK')
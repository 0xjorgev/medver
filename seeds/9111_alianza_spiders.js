
console.log(__filename.slice(__dirname.length + 1) + ' START')


    //Deletes ALL existing entries

    exports.seed = function(knex, Promise) {
      return Promise.join(

    //==========================================================================
    // Eagles - Academy Primera Ronda - Grupo A
    //==========================================================================
    /*
      Costa Chicha		11
      Xolas		        10
      Pedro Espinoza	17
      Eagles		      12
      Academia United 14
      Fusion		      16
      Archi		        15
      Sur carolina		13

      Category_id: 12
      Groups ids:
      knex('groups').insert({id: 15, name: 'Grupo A', phase_id:6}),
      knex('groups').insert({id: 16, name: 'Grupo B', phase_id:6}),
      knex('groups').insert({id: 17, name: 'Grupo Semi-final', phase_id:7}),
      knex('groups').insert({id: 18, name: 'Grupo Final', phase_id:8})

      Phases_id:
      knex('phases').insert({id: 6, name: 'Fase general', position:0, category_id:12, participant_team:8, classified_team:4}),
      knex('phases').insert({id: 7, name: 'Semi-final', position:1, category_id:12, participant_team:4, classified_team:2}),
      knex('phases').insert({id: 8, name: 'Final', position:3, category_id:12, participant_team:2, classified_team:1})

    */

    //Grupo A Fase 1
    knex('categories_groups_phases_teams').insert({team_id:10, category_id:4, group_id:4, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:11, category_id:4, group_id:4, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:12, category_id:4, group_id:4, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:13, category_id:4, group_id:4, phase_id:3}),

    //Grupo B Fase 1
    knex('categories_groups_phases_teams').insert({team_id:14, category_id:4, group_id:5, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:15, category_id:4, group_id:5, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:16, category_id:4, group_id:5, phase_id:3}),
    knex('categories_groups_phases_teams').insert({team_id:17, category_id:4, group_id:5, phase_id:3}),

    //Grupo Semi
    knex('categories_groups_phases_teams').insert({team_id:10, category_id:4, group_id:6, phase_id:4}),
    knex('categories_groups_phases_teams').insert({team_id:12, category_id:4, group_id:6, phase_id:4}),
    knex('categories_groups_phases_teams').insert({team_id:14, category_id:4, group_id:6, phase_id:4}),
    knex('categories_groups_phases_teams').insert({team_id:15, category_id:4, group_id:6, phase_id:4}),

    //Grupo Finalista
    knex('categories_groups_phases_teams').insert({team_id:10, category_id:4, group_id:7, phase_id:5}),
    knex('categories_groups_phases_teams').insert({team_id:15, category_id:4, group_id:7, phase_id:5})

    )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')
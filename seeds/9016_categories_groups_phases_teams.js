
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('categories_groups_phases_teams').del())

    /*
            table.integer('team_id').references('teams.id').index();
            table.integer('category_id').references('categories.id').index();
            table.integer('group_id').references('groups.id').index();
            table.integer('phase_id').references('phases.id').index();

            Teams: 4-9
            Categories: 1 'Koopas', 2 'Yoshis', 3 'Kuppa Troopas'
            Group: 1 - Grupo A, 2 Grupo B, 3 Finalistas
            Phases: 1 - Apertura, 2 - Clausura
    */

    // Inserts seed entries
    // knex('categories_groups_phases_teams').insert({team_id:4, category_id:1, group_id:1, phase_id:1}),
    // knex('categories_groups_phases_teams').insert({team_id:5, category_id:1, group_id:1, phase_id:1}),
    // knex('categories_groups_phases_teams').insert({team_id:6, category_id:1, group_id:2, phase_id:1}),
    // knex('categories_groups_phases_teams').insert({team_id:7, category_id:1, group_id:3, phase_id:1}),
    // knex('categories_groups_phases_teams').insert({team_id:8, category_id:1, group_id:null, phase_id:1}),
    // knex('categories_groups_phases_teams').insert({team_id:9, category_id:1, group_id:null, phase_id:1})
    // );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
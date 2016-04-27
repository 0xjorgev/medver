
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions_roles_organizations').del(),
    // Inserts seed entries
    knex('competitions_roles_organizations').insert({id: 1, competition_id: 1, organization_id:1, rol_id:3})
  );
};
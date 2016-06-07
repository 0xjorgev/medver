exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations_roles_users').del(),
    knex('organizations_roles_users').insert({id: 1, user_id: 1, organization_id: 1, rol_id:1}),
    knex('organizations_roles_users').insert({id: 2, user_id: 2, organization_id: 2, rol_id:2})
  );
};
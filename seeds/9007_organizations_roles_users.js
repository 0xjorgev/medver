
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('organizations_roles_users').del(),
    knex('organizations_roles_users').insert({user_id: 1, organization_id: 1, rol_id:1}),
    knex('organizations_roles_users').insert({user_id: 2, organization_id: 2, rol_id:2})
  );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

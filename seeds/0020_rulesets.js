
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rulesets').del(),
    // Inserts seed entries
    knex('rulesets').insert({id: 1, name: 'Default Rulesets', 'short_name':'df'})
  );
};

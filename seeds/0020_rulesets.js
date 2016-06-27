
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rulesets').del(),
    // Inserts seed entries
    knex('rulesets').insert({name: 'Default Rulesets', 'short_name':'df'})
  );
};

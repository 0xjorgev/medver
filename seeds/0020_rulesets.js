
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rulesets').del(),
    // Inserts seed entries
    knex('rulesets').insert({name: 'Default Rulesets', 'short_name':'df'})
  );
};


console.log(__filename.slice(__dirname.length + 1) + ' OK')
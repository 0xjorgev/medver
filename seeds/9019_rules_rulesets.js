
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rules_rulesets').del(),

    /*
			table.integer('rule_id').references('rules.id').index();
			table.integer('ruleset_id').references('rulesets.id').index();

    */
    // Inserts seed entries
    knex('rules_rulesets').insert({rule_id: 1, ruleset_id:1}),
    knex('rules_rulesets').insert({rule_id: 2, ruleset_id:1}),
    knex('rules_rulesets').insert({rule_id: 3, ruleset_id:1})
  );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('rules_rulesets', function(table){
			table.increments('id');
			table.integer('rule_id').references('rules.id').index();
			table.integer('ruleset_id').references('rulesets.id').index();
			table.boolean('active').notNullable().defaultTo(true);
			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.then(function(){
			//Add query
            return knex.raw('');
        })
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ knex.schema.dropTableIfExists('rules_rulesets') ]);
};

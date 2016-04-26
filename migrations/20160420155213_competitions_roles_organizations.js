
exports.up = function(knex, Promise) {
    return Promise.all([
		knex.schema.createTable('competitions_roles_organizations', function(table){
			table.increments('id');
			table.integer('competition_id').references('competitions.id').index();
			table.integer('organization_id').references('organizations.id').index();
			table.integer('rol_id').references('roles.id').index();
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
  return Promise.all([ knex.schema.dropTableIfExists('competitions_roles_organizations') ]);
};
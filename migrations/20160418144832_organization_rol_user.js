
exports.up = function(knex, Promise) {
    return Promise.all([
		knex.schema.createTable('organizations_roles_users', function(table){
			table.increments('id').primary();
			table.integer('user_id').references('users.id').index();
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
	return Promise.all([ knex.schema.dropTableIfExists('organizations_roles_users') ]);
};
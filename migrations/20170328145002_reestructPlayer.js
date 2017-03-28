exports.up = function(knex, Promise) {
  	return Promise.all([
  		knex.schema.alterTable('players_teams', (table) => {
			table.dropColumn('player_id')
		})
	])
	.then(function(){
		return Promise.all([
	  		//Borro tabla vieja de players
			knex.schema.dropTableIfExists('players')
		])
	})
	.then(function(){
		return Promise.all([
			//Creo nueva estructura igual a tabla de players_teams
			knex.schema.createTable('players', function(table){
				table.increments('id').primary();
				table.boolean('active').notNullable().defaultTo(true);
				table.integer('number');
				table.string('img_url');
				table.date('registered_at');
				table.date('unregistered_at');
				//Relationships
				table.integer('person_id').references('persons.id').index();
				table.integer('team_id').references('teams.id').index();
				table.integer('position_id').references('positions.id').index();
				table.integer('status_type_id').references('status_types.id').index()
				//Audit Log
				table.timestamp('created_at').defaultTo(knex.fn.now());
				table.timestamp('updated_at').defaultTo(knex.fn.now());
			})
		])
	})
};

exports.down = function(knex, Promise) {
  	return Promise.all([
  		//Borro la tabla nueva
		knex.schema.dropTableIfExists('players')
		})
	])
	.then(function(){
		return Promise.all([
			//Creo la tabla anterior
			knex.schema.createTable('players', function(table){
				table.increments('id').primary();
				table.string('first_name');
				table.string('last_name');
				table.string('img_url');
				table.string('portrait_url');
				table.string('document_number');
				table.string('nickname');
				table.date('birthday');
				table.integer('status_id').notNullable().defaultTo(1);
				table.string('email');
				table.boolean('active').notNullable().defaultTo(true);
				table.timestamp('created_at').defaultTo(knex.fn.now());
				table.timestamp('updated_at').defaultTo(knex.fn.now());

				//Relationships
				table.integer('gender_id').references('genders.id').index();
			})
		])
	})
	.then(function(){
		return Promise.all([
			//Se guardan los datos de person on players
			knex.raw("INSERT INTO players (first_name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at) SELECT name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at from persons")
		])
	})
	.then(function(){
		return knex.schema.alterTable('players_teams', (table) => {
			table.integer('player_id').references('player.id').index()
		})
	})
	.then(function(){
		return Promise.all([
			//Se guardan los datos de person on players
			knex.raw("update players_teams set player_id = person_id")
		])
	})
};
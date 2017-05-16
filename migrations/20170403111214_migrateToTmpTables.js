
exports.up = function(knex, Promise) {
  	
  	//Creamos las tablas temporales a las cuales se migraran los datos
  	return Promise.all([
		knex.schema.createTable('tmp_persons', function(table){
			table.increments('id').primary()
			table.string('first_name')
			table.string('last_name')
			table.string('nickname')
			table.date('birthday')
			table.string('email')
			table.integer('gender_id').references('genders.id').index()
			table.string('height') //Se usaran las unidad metrica
			table.string('weight') //Se usaran las unidad metrica
			table.integer('status_type_id').references('status_types.id').index()
			table.string('img_url')
			table.string('document_number')
			table.string('document_img_url')
			table.string('nationality')
			table.integer('player_id')
			table.string('meta')
			table.boolean('claimed')
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamp('created_at').defaultTo(knex.fn.now())
			table.timestamp('updated_at').defaultTo(knex.fn.now())
		})
	])
	.then(function(){
		//Migro la informacion de player a la tabla temporal person colocando el id del player como player_id
		return Promise.all([
			knex.raw("INSERT INTO tmp_persons (first_name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at, player_id) SELECT first_name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at, id from players")
		])
	})
	.then(function(){
		//Se crea la tabla temporal del player team
		return Promise.all([
			knex.schema.createTable('tmp_players_teams', function(table){
				table.increments('id').primary()
				table.boolean('active').notNullable().defaultTo(true)
				//Fixed related data
				table.integer('number')
				table.string('img_url')
				table.date('registered_at')
				table.date('unregistered_at')
				table.integer('player_id')
				table.integer('team_player_id')
				table.integer('person_id')
				//Relationships
				table.integer('team_id').references('teams.id').index()
				table.integer('position_id').references('positions.id').index()
				//Audit Log
				table.timestamp('created_at').defaultTo(knex.fn.now());
				table.timestamp('updated_at').defaultTo(knex.fn.now());
			})
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.raw("INSERT INTO tmp_players_teams (active, registered_at, unregistered_at, team_id, position_id, created_at, updated_at, player_id, team_player_id, number) SELECT active, registered_at, unregistered_at, team_id, position_id, created_at, updated_at, player_id, id, number from players_teams")
		])
	})
	.then(function(){
		//Se crea la tabla temporal del categories teams players
		return Promise.all([
			knex.schema.createTable('tmp_categories_players', function(table){
				table.increments('id').primary()
				table.integer('team_player_id')
				table.boolean('present_in_field')
				table.integer('team_id').references('teams.id').index()
				table.integer('player_id')
				//Relationships
				table.integer('category_id').references('categories.id').index()
				table.boolean('active')
				table.timestamp('created_at').defaultTo(knex.fn.now())
				table.timestamp('updated_at').defaultTo(knex.fn.now())
			})
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.raw("INSERT INTO tmp_categories_players (present_in_field, team_id, player_id, category_id, active, created_at, updated_at ) SELECT present_in_field, team_id, player_id, category_id, active, created_at, updated_at from categories_teams_players")
		])
	})
	.then(function(){
		//Se crea la tabla temporal del Matches teams players
		return Promise.all([
			knex.schema.createTable('tmp_matches_players', function(table){
				table.increments('id').primary()
	      		table.integer('number')
				table.integer('position_id').references('positions.id').index()
				table.integer('team_player_id')
				table.boolean('is_initial').notNullable().defaultTo(true)
				table.boolean('active').notNullable().defaultTo(true)
	      		table.integer('match_id').references('matches.id').index()
				table.integer('team_id').references('teams.id').index()
				table.integer('player_id')
				table.integer('matches_players_id')
	      		//
				table.timestamp('created_at').defaultTo(knex.fn.now())
				table.timestamp('updated_at').defaultTo(knex.fn.now())
			})
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.raw("INSERT INTO tmp_matches_players (number, is_initial, team_id, player_id, match_id, active, created_at, updated_at, matches_players_id ) SELECT number, is_initial, team_id, player_id, match_id, active, created_at, updated_at, id from matches_teams_players")
		])
	})
	.then(function(){
		//Se crea la tabla temporal del event matches players
		return Promise.all([
			knex.schema.createTable('tmp_events_matches_players', function(table){
				table.increments('id').primary()
				table.boolean('active').notNullable().defaultTo(true)
				table.integer('instant').defaultTo(0)
				//Relationships
				table.integer('player_in')
				table.integer('player_out')
				table.integer('match_id').references('matches.id').index()
				table.integer('event_id').references('events.id').index()
				table.integer('events_matches_players_id')
				table.integer('team_id').references('teams.id').index()
				table.timestamp('created_at')
				table.timestamp('updated_at')
			})
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.raw("INSERT INTO tmp_events_matches_players (active, instant, player_in, player_out, match_id, event_id, team_id, created_at, updated_at, events_matches_players_id ) SELECT active, instant, player_in, player_out, match_id, event_id, team_id, created_at, updated_at, id from events_matches_players")
		])
	})
};

exports.down = function(knex, Promise) {
  	
	return Promise.all([
		knex.schema.dropTableIfExists('tmp_events_matches_players')
	])
	.then(function(){
		return Promise.all([
			knex.schema.dropTableIfExists('tmp_matches_players')
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.schema.dropTableIfExists('tmp_categories_players')
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([
			knex.schema.dropTableIfExists('tmp_players_teams')
		])
	})
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([		
			knex.schema.dropTableIfExists('tmp_persons')
		])
	})
};

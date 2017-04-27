
exports.up = function(knex, Promise) {
	//Creamos referencias en la tabla player
	return Promise.all([
		//Se crea la referencia a la tabla persona y se borran las columnas 
		// ya no necesarias como player_id y team_player_id
		knex.schema.alterTable('players', (table) => {
			table.foreign('person_id').references('persons.id')
			table.dropColumn('team_player_id')
			table.dropColumn('player_id')
		})
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('match_players', (table) => {
				table.foreign('player_id').references('players.id')
				table.dropColumn('team_player_id')
				table.dropColumn('matches_players_id')
			})
		])
	})
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('persons', (table) => {
				table.dropColumn('player_id')
			})
		])
	})
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.dropForeign('person_id')
			table.integer('team_player_id')
			table.integer('player_id')
		})
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('match_players', (table) => {
				table.dropForeign('player_id')
				table.integer('team_player_id')
				table.integer('matches_players_id')
			})
		])
	})
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('persons', (table) => {
				table.integer('player_id')
			})
		])
	})
};

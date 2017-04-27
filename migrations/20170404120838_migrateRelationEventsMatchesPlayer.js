
exports.up = function(knex, Promise) {
  	return Promise.all([
  		//Se elimina la columna temporal player_id con referencia al id del player viejo
		knex.schema.alterTable('events_matches_players', (table) => {
			table.dropColumn('events_matches_players_id')
		})
	])
	.then(function(){
		//Agregamos la referencia a la tabla players.id para player in y player_out
		return Promise.all([
			knex.schema.alterTable('events_matches_players', (table) => {
  				table.foreign('player_in').references('players.id')
  				table.foreign('player_out').references('players.id')
			})
		])
	})
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('events_matches_players', (table) => {
			table.dropForeign('player_in')
			table.dropForeign('player_out')
		})
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('events_matches_players', (table) => {
				table.integer('events_matches_players_id')
			})
		])
	})
};

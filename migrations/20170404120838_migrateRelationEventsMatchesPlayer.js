
exports.up = function(knex, Promise) {
  	return Promise.all([
  		//Se elimina la columna temporal player_id con referencia al id del player viejo
		knex.schema.alterTable('events_matches_players', (table) => {
			table.dropColumn('events_matches_players_id')
		})
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('events_matches_players', (table) => {
				table.integer('player_in').references('players.id').index();
				table.integer('player_out').references('players.id').index();
			})
		])
	})
};

exports.down = function(knex, Promise) {
  	return Promise.all([
  		//Se elimina la columna temporal player_id con referencia al id del player viejo
		knex.schema.alterTable('events_matches_players', (table) => {
			table.integer('events_matches_players_id')
		})
	])
	// .then(function(){
	// 	//Se crea la columna player_id con referencia al id del player nuevo
	// 	return Promise.all([
	// 		knex.schema.alterTable('events_matches_players', (table) => {
	// 			table.integer('events_matches_players_id')
	// 		})
	// 	])
	// })
};

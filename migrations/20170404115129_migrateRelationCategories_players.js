
exports.up = function(knex, Promise) {
  	return Promise.all([
  		//Se elimina la columna temporal player_id con referencia al id del player viejo
		knex.schema.alterTable('categories_players', (table) => {
			table.dropColumn('player_id')
		})
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('categories_players', (table) => {
				table.integer('player_id').references('players.id').index();
			})
		])
	})
	.then(function(){
		//migramos la informacion del player id nuevo
		return Promise.all([
			knex.raw("UPDATE categories_players SET player_id = team_player_id")
		])
	})
	.then(function(){
		//borramos la info temp del player id nuevo
		return Promise.all([
			knex.schema.alterTable('categories_players', (table) => {
				table.dropColumn('team_player_id')
			})
		])
	})	
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('categories_players', (table) => {
			table.integer('team_player_id')
		})
	])
	.then(function(){
		//migramos la informacion del player id nuevo
		return Promise.all([
			knex.raw("UPDATE categories_players SET team_player_id = player_id")
		])
	})
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('categories_players', (table) => {
				table.dropColumn('player_id')
			})
		])
	})
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('categories_players', (table) => {
				table.integer('player_id')
			})
		])
	})
};

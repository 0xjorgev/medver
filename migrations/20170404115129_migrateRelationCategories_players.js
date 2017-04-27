
exports.up = function(knex, Promise) {
  	return Promise.all([
  		//Se elimina la columna temporal player_id con referencia al id del player viejo
		knex.raw("UPDATE category_summoned SET player_id = team_player_id")
	])
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('category_summoned', (table) => {
				table.foreign('player_id').references('players.id');
			})
		])
	})
	.then(function(){
		//borramos la info temp del player id nuevo
		return Promise.all([
			knex.schema.alterTable('category_summoned', (table) => {
				table.dropColumn('team_player_id')
			})
		])
	})	
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('category_summoned', (table) => {
			table.integer('team_player_id')
		})
	])
	.then(function(){
		//migramos la informacion del player id nuevo
		return Promise.all([
			knex.raw("UPDATE category_summoned SET team_player_id = player_id")
		])
	})
	.then(function(){
		//Se crea la columna player_id con referencia al id del player nuevo
		return Promise.all([
			knex.schema.alterTable('category_summoned', (table) => {
				table.dropForeign('player_id')
			})
		])
	})
};

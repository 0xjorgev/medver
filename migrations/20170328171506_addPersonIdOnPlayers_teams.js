
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('players_teams', (table) => {
			table.integer('person_id')
		})
	])
	.then(function(){
		//Se actualiza el valor de person id con el valor del player id
		return Promise.all([		
			knex.raw("UPDATE players_teams set person_id = player_id")
		])
	})

};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('players', (table) => {
			table.dropColumn('document_img_url')
		})
	])
};

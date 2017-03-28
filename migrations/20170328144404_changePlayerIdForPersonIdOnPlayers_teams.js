
exports.up = function(knex, Promise) {
  	return Promise.all([
  		knex.schema.alterTable('players_teams', (table) => {
			table.integer('person_id').references('persons.id').index()
		})
	])
	.then(function(){
		return Promise.all([
			knex.raw("update players_teams set person_id = player_id")
		])
	})
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.schema.alterTable('players_teams', (table) => {
			table.dropColumn('person_id')
		})
	])
};


exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.raw("update tmp_players_teams set person_id = (Select id as person_id from tmp_persons where player_id = tmp_players_teams.player_id)")
	])
}

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("update tmp_players_teams set person_id = NULL")
	])
};

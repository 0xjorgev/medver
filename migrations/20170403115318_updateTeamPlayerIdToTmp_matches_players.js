
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.raw("UPDATE tmp_matches_players SET team_player_id = (SELECT id AS team_player_id FROM tmp_players_teams WHERE player_id = tmp_matches_players.player_id AND team_id = tmp_matches_players.team_id limit 1)")
	])
}

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("UPDATE tmp_matches_players SET team_player_id = NULL")
	])
};

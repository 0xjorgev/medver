
exports.up = function(knex, Promise) {
	return Promise.all([ 
		knex.raw("UPDATE tmp_events_matches_players SET player_in = (SELECT id AS team_player_id FROM tmp_players_teams WHERE player_id = tmp_events_matches_players.player_in AND team_id = tmp_events_matches_players.team_id)")
		,knex.raw("UPDATE tmp_events_matches_players SET player_out = (SELECT id AS team_player_id FROM tmp_players_teams WHERE player_id = tmp_events_matches_players.player_out AND team_id = tmp_events_matches_players.team_id)")
	])
}

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("UPDATE tmp_events_matches_players SET player_in = (SELECT player_id FROM tmp_players_teams WHERE id = tmp_events_matches_players.player_in)")
		,knex.raw("UPDATE tmp_events_matches_players SET player_out = (SELECT player_id FROM tmp_players_teams WHERE id = tmp_events_matches_players.player_out)")
		
	])
};
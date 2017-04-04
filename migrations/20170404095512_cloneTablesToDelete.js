
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.raw("ALTER TABLE categories_teams_players RENAME TO categories_teams_players_old")
		,knex.raw("ALTER TABLE matches_teams_players RENAME TO matches_teams_players_old")
		,knex.raw("ALTER TABLE events_matches_players RENAME TO events_matches_players_old")
		,knex.raw("ALTER TABLE players_teams RENAME TO players_teams_old")
		,knex.raw("ALTER TABLE players RENAME TO players_old")
	])
  
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("ALTER TABLE categories_teams_players_old RENAME TO categories_teams_players")
		,knex.raw("ALTER TABLE matches_teams_players_old RENAME TO matches_teams_players")
		,knex.raw("ALTER TABLE events_matches_players_old RENAME TO events_matches_players")
		,knex.raw("ALTER TABLE players_teams_old RENAME TO players_teams")
		,knex.raw("ALTER TABLE players_old RENAME TO player")
	])
};


exports.up = function(knex, Promise) {
	return Promise.all([
		knex.raw("ALTER TABLE tmp_categories_players RENAME TO category_summoned")
		,knex.raw("ALTER TABLE tmp_matches_players RENAME TO match_players")
		,knex.raw("ALTER TABLE tmp_events_matches_players RENAME TO events_matches_players")
		,knex.raw("ALTER TABLE tmp_players_teams RENAME TO players")
		,knex.raw("ALTER TABLE tmp_persons RENAME TO persons")
	])
  
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("ALTER TABLE category_summoned RENAME TO tmp_categories_players")
		,knex.raw("ALTER TABLE match_players RENAME TO tmp_matches_players")
		,knex.raw("ALTER TABLE events_matches_players RENAME TO tmp_events_matches_players")
		,knex.raw("ALTER TABLE players RENAME TO tmp_players_teams")
		,knex.raw("ALTER TABLE persons RENAME TO tmp_persons")
	])
};
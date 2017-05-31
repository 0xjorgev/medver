-- Fix match 1617 FROM NCA U6
UPDATE matches SET played = false WHERE id = 1617;
DELETE FROM events_matches_players WHERE match_id = 1617;

-- Fix all the matches from NCA U8
UPDATE matches SET played = false WHERE group_id IN (366,368,377);
DELETE FROM events_matches_players WHERE match_id IN (SELECT id FROM matches WHERE group_id IN (366,368,377));
DELETE FROM standing_tables WHERE group_id IN (366,368,377);

-- Fix all the matches from NCA U12
UPDATE matches SET played = false WHERE group_id IN (340, 339, 342, 341, 345);
DELETE FROM events_matches_players WHERE match_id IN (SELECT id FROM matches WHERE group_id IN (340, 339, 342, 341, 345));
DELETE FROM standing_tables WHERE group_id IN (340, 339, 342, 341, 345);

-- Fix all the matches from NCA U16
UPDATE matches SET played = false WHERE group_id IN (355, 359, 360, 361, 362, 364);
DELETE FROM events_matches_players WHERE match_id IN (SELECT id FROM matches WHERE group_id IN (355, 359, 360, 361, 362, 364));
DELETE FROM standing_tables WHERE group_id IN (355, 359, 360, 361, 362, 364);

-- Fix Phase 2 of NCA U16
UPDATE matches SET visitor_team_id = null, home_team_id = null WHERE group_id IN (369,363,371,370);

-- standing table query
-- select team_id, group_id, points, row_number() over (partition by group_id order by points desc, (goals_in_favor - goals_against) desc, goals_in_favor desc, goals_against desc, matches_won desc, matches_lost desc, matches_draw desc) as position from standing_tables  where phase_id in (227);

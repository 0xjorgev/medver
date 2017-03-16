delete from categories where id in (select id from categories where season_id in (select id from seasons where competition_id >= 6));
delete from seasons where id in (select id from seasons where competition_id >= 6);
delete from competitions_users where competition_id >= 6;
delete from competitions where id >= 6;

delete from categories_groups_phases_teams where team_id in (155);
delete from teams where id in (155);


exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.raw("update tmp_players_teams set person_id = (Select id as person_id from tmp_persons where player_id = tmp_players_teams.player_id limit 1)")
	])
	.then(function(){
		//actualizamos las entidades player a person
		return Promise.all([
			knex.raw("update entities set object_id = (Select id from tmp_persons where player_id = entities.object_id), object_type = 'persons' where object_type = 'players'")
		])
	})
}

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("update tmp_players_teams set person_id = NULL")
	])
	.then(function(){
		//actualizamos las entidades player a person
		return Promise.all([
			knex.raw("update entities set object_id = (Select player_id as object_id from tmp_persons where id = entities.object_id), object_type = 'players' where object_type = 'persons'")
		])
	})
};

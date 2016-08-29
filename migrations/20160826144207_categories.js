
exports.up = function(knex, Promise) {
  return Promise.all([
  		knex.schema.raw('alter table categories add player_minimum_summoned integer , add player_maximum_summoned integer;')
	]);
};

exports.down = function(knex, Promise) {
  
};

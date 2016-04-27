exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('seasons').del(),

    // Inserts seed entries
    knex('seasons')
    .insert(
        {name:'Opening 2016',description:'First Season of the Mushroom Cup!!',game_title:'Mushroom Cup',competition_id:1 }
        )
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
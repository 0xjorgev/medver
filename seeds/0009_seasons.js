exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('seasons').del(),

    // Inserts seed entries
    knex('seasons')
    .insert(
        {id:1, name:'Opening 2016',description:'First Season of the Mushroom Cup!!',game_title:'Mushroom Cup',competition_id:1 }
        )
    );
};

console.log(__filename.slice(__dirname.length + 1) + ' START')

console.log('9004 start')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('seasons').del(),

    // Inserts seed entries
    knex('seasons')
    .insert(
        {name:'Opening 2016', description:'First Season of the Mushroom Cup!!', game_title:'Mushroom Cup', competition_id:1 }
        )
    );
};
console.log('9004 end')

console.log(__filename.slice(__dirname.length + 1) + ' OK')
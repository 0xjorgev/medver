
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('seasons').del(),

    // Inserts seed entries
    knex('seasons').insert({name:'Opening 2016', description:'Year 2016, first season', game_title:'Golden Cup', competition_id:1, init_at: '01/01/2016', ends_at: '08/01/2016' })
    // knex('seasons').insert({name:'Atlanta 2016',description:'Altanta 2016, Copa Coca-Cola',game_title:'Coca-Cola Cup',competition_id:2 })
    );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

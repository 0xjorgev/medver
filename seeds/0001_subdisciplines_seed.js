
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
//var tableName = ''subdisciplines'';
  return Promise.join(
    // Deletes ALL existing entries
    knex('subdisciplines').del(),

    // Inserts seed entries
    knex('subdisciplines').insert({name: 'Five-a-side football', description:"Is a variation of association football in which each team fields five players (four outfield players and a goalkeeper). Other differences from football include a smaller pitch, smaller goals, and ...", discipline_id:1, image_url:'http://dev.codefuel.me/smsmedia/somosport-vector-icons-fut5.svg', active:true}),
    knex('subdisciplines').insert({name: 'Soccer', description:"Association football, more commonly known as football or soccer,[3] is a sport played between two teams of eleven players with a spherical ball.", discipline_id:1, image_url:'http://dev.codefuel.me/smsmedia/somosport-vector-icons-futbol-4.svg', active:true}),
    knex('subdisciplines').insert({name: 'Beach Soccer', description:"Beach soccer, also known as beach football or beasal, is a variant of association football played on a beach or some form of sand.", discipline_id:1, image_url:'http://dev.codefuel.me/smsmedia/somosport-vector-icons-futbol-2.svg', active:true}),
    knex('subdisciplines').insert({name: 'Futsal', description:"Futsal is a variant of association football that is played on a smaller field and mainly played indoors. It can be considered a version of five-a-side football. It originated in Uruguay in 1930", discipline_id:1, image_url:'http://dev.codefuel.me/smsmedia/somosport-vector-icons-fut7.svg', active:true})
  );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
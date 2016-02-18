exports.seed = function(knex, Promise) {
var tableName = 'subdisciplines';
  return Promise.join(
    // Deletes ALL existing entries
    knex(tableName).del(),

    // Inserts seed entries
    knex(tableName).insert({name: 'Five-a-side football', description:" is a variation of association football in which each team fields five players (four outfield players and a goalkeeper). Other differences from football include a smaller pitch, smaller goals, and a reduced game duration. Matches are played indoors, or outdoors on AstroTurf or artificial grass pitches that may be enclosed within a barrier or cage to prevent the ball from leaving the playing area and keep the game flowing.", discipline_id:1}),
    knex(tableName).insert({name: 'Baseball', description:"Association football, more commonly known as football or soccer,[3] is a sport played between two teams of eleven players with a spherical ball.", discipline_id:1}),
    knex(tableName).insert({name: 'Soccer', description:"Association football, more commonly known as football or soccer,[3] is a sport played between two teams of eleven players with a spherical ball.", discipline_id:1}),
    knex(tableName).insert({name: 'Beach Soccer', description:"Beach soccer, also known as beach football or beasal, is a variant of association football played on a beach or some form of sand.", discipline_id:1}),
    knex(tableName).insert({name: 'Futsal', description:"Futsal is a variant of association football that is played on a smaller field and mainly played indoors. It can be considered a version of five-a-side football. It originated in Uruguay in 1930", discipline_id:1})
  );
};
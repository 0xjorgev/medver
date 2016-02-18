
exports.seed = function(knex, Promise) {
var tableName = 'disciplines';
  return Promise.join(
    // Deletes ALL existing entries
    knex(tableName).del(),

    // Inserts seed entries
    knex(tableName).insert({name: 'Football', description:"Association football, more commonly known as football or soccer,[3] is a sport played between two teams of eleven players with a spherical ball."}),
    knex(tableName).insert({name: 'Baseball', description:"Baseball is a bat-and-ball game played between two teams of nine players each who take turns batting and fielding."}),
    knex(tableName).insert({name: 'Tennis', description:"Tennis is a racket sport that can be played individually against a single opponent (singles) or between two teams of two players each (doubles)."}),
    knex(tableName).insert({name: 'Basketball', description:"Basketball is a sport played by two teams of five players on a rectangular court. The objective is to shoot a ball through a hoop 18 inches (46 cm) in diameter and 10 feet (3.048 m) high mounted to a backboard at each end"}),
    knex(tableName).insert({name: 'Volleyball', description:"Volleyball is a team sport in which two teams of six players are separated by a net. Each team tries to score points by grounding a ball on the other team's court under organized rules."})
  );
};
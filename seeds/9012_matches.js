
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('matches').del(),

    // Inserts seed entries
    knex('matches').insert({
        location: 'Estadio Universitario, Caracas, Venezuela',
        home_team_id:1,
        visitor_team_id:2,
        round_id:1,
        date:'2016-06-01 16:30:56.576272-04:30'}),
    knex('matches').insert({
        location: 'La Guaira, Vargas, Venezuela',
        home_team_id:3,
        visitor_team_id:4,
        round_id:1,
        date:'2016-06-01 16:30:56.576272-04:30'}),
    knex('matches').insert({
        location: 'Estadio Contemporáneo, Barquisimeto, Venezuela',
        home_team_id:1,
        visitor_team_id:4,
        round_id:1,
        date:'2016-06-01 16:30:56.576272-04:30'}),
    knex('matches').insert({
        location: 'Estadio 2do, Maracaibo, Venezuela',
        home_team_id:2,
        visitor_team_id:3,
        round_id:2,
        date:'2016-06-02 16:30:56.576272-04:30'}),
    knex('matches').insert({
        location: 'Pokemon Stadium, Caracas, Venezuela',
        home_team_id:1,
        visitor_team_id:3,
        round_id:2,
        date:'2016-06-02 16:30:56.576272-04:30'}),
    knex('matches').insert({
        location: 'Yankee Stadium, Los Samanes, Venezuela',
        home_team_id:2,
        visitor_team_id:4,
        round_id:2,
        date:'2016-06-02 16:30:56.576272-04:30'})
  );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('matches').del(),

    /*

			table.increments('id');
			table.text('place');
			table.integer('home_team').references('teams.id').index();
			table.integer('visitor_team_id').references('teams.id').index();
			table.integer('round_id').references('rounds.id').index();
			table.timestamp('date');
    */
    // Inserts seed entries
    knex('matches').insert({id: 1, place: 'Estadio Universitario, Caracas, Venezuela', home_team_id:1, visitor_team_id:2 ,round_id:1, date:'2016-06-01 16:30:56.576272-04:30'}),
    knex('matches').insert({id: 2, place: 'Estadio Universitario, Caracas, Venezuela', home_team_id:2, visitor_team_id:3 ,round_id:1, date:'2016-06-01 16:30:56.576272-04:30'}),
    knex('matches').insert({id: 3, place: 'Estadio Universitario, Caracas, Venezuela', home_team_id:1, visitor_team_id:3 ,round_id:2, date:'2016-07-01 16:30:56.576272-04:30'}),
    knex('matches').insert({id: 4, place: 'Estadio Universitario, Caracas, Venezuela', home_team_id:2, visitor_team_id:1 ,round_id:2, date:'2016-07-02 16:30:56.576272-04:30'})
  );
};
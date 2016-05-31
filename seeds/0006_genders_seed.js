exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('genders').del(),

    // Inserts seed entries
    knex('genders')
    .insert([
        {id:1, name:'Masculine',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-league.svg'},
        {id:2, name:'Femenine',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-cup.svg'},
        {id:3, name:'Mixed',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-championship.svg'}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
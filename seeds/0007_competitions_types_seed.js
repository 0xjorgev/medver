
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions_types').del(),

    // Inserts seed entries
    knex('competitions_types')
    .insert([
            {name:'League',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-league.svg'},
            {name:'Cup',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-cup.svg'},
            {name:'Championship',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-championship.svg'}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
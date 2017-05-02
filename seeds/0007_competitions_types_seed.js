
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions_types').del(),

    // Inserts seed entries
    knex('competitions_types')
    .insert([
            {id:1,name:'League',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-league.svg'},
            {id:2,name:'Cup',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-cup.svg'},
            {id:3,name:'Championship',image_url:'https://s3.amazonaws.com/codefuel/media/somosport-vector-icons-championship.svg'}
        ])
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')

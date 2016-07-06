
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('competitions').del(),

    // Inserts seed entries
    /*

            table.string('name');
            table.boolean('active').notNullable().defaultTo(true);
            table.integer('discipline_id').references('disciplines.id').index();
            table.integer('subdiscipline_id').references('subdisciplines.id').index();
            table.integer('competition_type').references('competitions_types.id').index();

    */

    knex('competitions')
    .insert({name:'Mushroom Cup',discipline_id:1, subdiscipline_id:2, competition_type_id:2, description: 'description of Mushroom Cup', img_url: 'http://media.idownloadblog.com/wp-content/uploads/2015/12/1UP-Mushroom.png', portrait_url: 'http://previews.123rf.com/images/photoroad/photoroad1308/photoroad130800996/21856452-Fungi-cup-red-mushroom-cup-mushroom-or-champagne-mushrooms-thailand--Stock-Photo.jpg'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
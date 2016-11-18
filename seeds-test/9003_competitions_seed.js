
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

    knex('competitions').insert({is_published: true, name:'SomoSport Official Demo',discipline_id:1, subdiscipline_id:2, competition_type_id:2, description: 'Description of the SomoSport Official Competition Demo', img_url: 'http://ss-competition-dev.herokuapp.com/img/somosport-logo-big.png', portrait_url: 'http://ss-competition-dev.herokuapp.com/img/IMG_8616.jpeg'})
    // knex('competitions').insert({name:'Copa Coca-Cola',discipline_id:1, subdiscipline_id:2, competition_type_id:2, description: 'Copa Coca-Cola', img_url: 'https://s3.amazonaws.com/codefuel/media/logo_torneo_cocacola.png', portrait_url: 'https://s3.amazonaws.com/codefuel/media/slide2.jpg'})
  )
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')


console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Competitions Data
    //==========================================================================
     knex('competitions').insert({name:'Copa Coca-Cola',discipline_id:1, subdiscipline_id:2, competition_type_id:2, description: 'Copa Coca-Cola', img_url: 'https://s3.amazonaws.com/codefuel/media/logo_torneo_cocacola.png', portrait_url: 'https://s3.amazonaws.com/codefuel/media/slide2.jpg', is_published: true})
  )
}


console.log(__filename.slice(__dirname.length + 1) + ' OK')

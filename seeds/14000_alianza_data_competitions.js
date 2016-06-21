
console.log('14000 seeding alianza Competitions')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Alianza Competitions Data
    //==========================================================================
    knex('competitions').insert({id: 10, name:'Copa Coca-Cola U-15 Girls',discipline_id:1, subdiscipline_id:2, competition_type_id:2, description: 'Copa Coca-Cola U-15 Girls Atlanta', img_url: 'https://s3.amazonaws.com/codefuel/media/logo_torneo_cocacola.png', portrait_url: 'http://previews.123rf.com/images/photoroad/photoroad1308/photoroad130800996/21856452-Fungi-cup-red-mushroom-cup-mushroom-or-champagne-mushrooms-thailand--Stock-Photo.jpg'})
  )
}
console.log('14000 OK')

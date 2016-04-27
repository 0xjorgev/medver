exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('contacts').del(),
    // Inserts seed entries
    knex('contacts').insert({id:1,country:'Spain', state:'Barcelona', city:'Barcelona', zip_code:1071, phone:'+349534452', email:'info@fcbarcelona.com', website_url:'http://www.fcbarcelona.com'}),
    knex('contacts').insert({id:2,country:'USA', state:'Texas', city:'Houston', zip_code:33131, phone:'+1305200034', email:'info@alianzadefutbol.com', website_url:'http://www.alianzadefutbol.com'})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};
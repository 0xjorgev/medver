
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rules').del(),
    // Inserts seed
    //54.86.225.114 amazon
    //localhost
    //root
    //C0d3fuel
    //phpmyadmin /usr/share/phpmyadmin/
    //alianza_root
    //#8npP6cEsgiK)x0Dk^
    //ioqbn8mtwznpezo9q68x06ljsh78b3lz
    //envato
    //Envato2016!

    knex('rules').insert({name: 'Partido Ganado', value:'3', short_name:'PG'}),
    knex('rules').insert({name: 'Partido Perdido', value:'0', short_name:'PP'}),
    knex('rules').insert({name: 'Partido Empatado', value:'1', short_name:'PE'})
  );
};

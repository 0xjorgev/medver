// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    ssl: false,
    connection: {
      user: "root",
      password: "root",
      database: "medver",
      port: 3306,
      host: "localhost",
      ssl: false
    },
    migrations: { tableName: 'schema_info'},
    pool: { min:1, max:5},
    seeds: { directory: 'seeds'}
  },
   production: {
     client: 'pg',
     ssl: true,
     connection: process.env.DATABASE_URL,
     migrations: { tableName: 'schema_info'},
     pool: { min:1, max:5},
     seeds: { directory: 'seeds'}
   }
};

/*
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  migrations: {
    tableName: 'migrations'
  }
});

*/


    // development: {
    //     client: 'pg',
    //     connection: {
    //         host: '127.0.0.1', // IP or domain name
    //         user: 'postgres', // DB username
    //         password: 'postgres', // DB password
    //         database: 'somosport_core', // DB name
    //         charset: 'utf8' // Or your preferred charset

    //         // host: 'ec2-54-225-165-132.compute-1.amazonaws.com', // IP or domain name
    //         // user: 'rpjjyrwrvbfmyo', // DB username
    //         // password: 'c4JJX-UqiY4eqwDPMvQk_pjiIU', // DB password
    //         // database: 'd662a1395kh861', // DB name
    //         // charset: 'utf8', // Or your preferred charset
    //         // ssl: true
    //     },
    //     debug: true,
    //     migrations: {
    //         tableName: 'knex_migrations',
    //         directory: 'migrations'
    //     }//,
        // seeds: {
        //     directory: 'seeds'
        //  }//,
        // pool: {
        //     max: 1
        // }
    // }

// Update with your config settings.
module.exports = {
  //development: {
    client: 'pg',
    connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    }
  //},
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL
  // }
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
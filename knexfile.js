
module.exports = {
  development: {
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : 'postgres',
        database : 'somosport_core'
    },
    migrations: { tableName: 'schema_info'},
    pool: { min:1, max:5},
    seeds: { directory: 'seeds'}
  },
   production: {
     client: 'pg',
     connection: process.env.DATABASE_URL,
     migrations: { tableName: 'schema_info'},
     pool: { min:1, max:5},
     seeds: { directory: 'seeds'}
   }
};

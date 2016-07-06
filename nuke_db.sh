PGUSER=postgres dropdb somosport_core && PGUSER=postgres createdb somosport_core && $(npm bin)/knex migrate:latest && $(npm bin)/knex seed:run

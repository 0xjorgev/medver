PGUSER=postgres dropdb somosport_core && PGUSER=postgres createdb somosport_core && knex migrate:latest && knex seed:run

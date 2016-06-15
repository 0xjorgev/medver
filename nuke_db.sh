PGUSER=ramses dropdb somosport_core && PGUSER=ramses createdb somosport_core && knex migrate:latest && knex seed:run

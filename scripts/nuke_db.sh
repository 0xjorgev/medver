pg_user=''

if [ -z $1 ] ; then
	pg_user='postgres'
else
	pg_user=$1
fi

echo '---------------------------------------------------------------------------------'
echo 'Corriendo nuke_db con el user' $pg_user
echo ' '
echo 'Utiliza' $0 '<usuario_postgres> en caso de errores de permisologia'
echo '---------------------------------------------------------------------------------'

PGUSER=$pg_user dropdb somosport_core && PGUSER=$pg_user createdb somosport_core && $(npm bin)/knex migrate:latest && $(npm bin)/knex seed:run && node tasks/load_sample_data.js && node tasks/cocacola_sf_20160813/load_cocacola_sf_20160813_data.js && node tasks/alianza_la_20160827/load.js

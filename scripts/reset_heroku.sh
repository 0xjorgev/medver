herokuenv=''

if [ -z $1 ] ; then
	herokuenv='dev'
else
	herokuenv=$1
fi

echo =======================================================================================================
echo
echo Se destruirá la BD del ambiente heroku-$herokuenv y se reconstruirá con los datos de prueba disponibles
echo
echo =======================================================================================================

#Script que reinicia la base de datos del ambiente seleccionado
heroku pg:reset DATABASE_URL -a ss-core-$herokuenv --confirm ss-core-$herokuenv && heroku run knex migrate:latest -a ss-core-$herokuenv && heroku run knex seed:run -a ss-core-$herokuenv  && heroku run node tasks/load_sample_data.js -a ss-core-$herokuenv && heroku run node tasks/cocacola_sf_20160813/load_cocacola_sf_20160813_data.js -a ss-core-$herokuenv

herokuenv=''

if [ -z $1 ] ; then
	herokuenv='-dev'
else
	if [ $1 = 'prod' ] ; then
		herokuenv=''
	else
		herokuenv=-$1
	fi
fi

echo "-------------------------------------------------------------------------------------"
echo "Descargando base de datos de ambiente $herokuenv"
echo "Utiliza get_heroku_db.sh <dev | qa | live | prod> para cambiar el ambiente a importar"
echo "-------------------------------------------------------------------------------------"

echo "heroku app: ss-core$herokuenv"

#dropdb somosport_core && heroku pg:pull -a ss-core-$herokuenv DATABASE_URL somosport_core
heroku pg:backups:capture --app ss-core$herokuenv && curl -o latest.dump `heroku pg:backups:public-url --app ss-core$herokuenv` && pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d somosport_core latest.dump

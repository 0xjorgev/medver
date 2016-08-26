herokuenv=''

if [ -z $1 ] ; then
	herokuenv='dev'
else
	herokuenv=$1
fi

echo =======================================================================================================
echo
echo Creando backup de la BD del ambiente heroku-$herokuenv
echo
echo =======================================================================================================

#Script que reinicia la base de datos del ambiente seleccionado
heroku pg:backups capture DATABASE_URL -a ss-core-$herokuenv
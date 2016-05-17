#dropdb somosport_core && heroku pg:pull -a somosportpocdev DATABASE_URL somosport_core
heroku pg:backups capture -a somosportpocdev &&
curl -o latest.dump `heroku pg:backups public-url -a somosportpocdev` &&
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U ramses -d somosport_core latest.dump

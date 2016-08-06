#dropdb somosport_core && heroku pg:pull -a ss-core-dev DATABASE_URL somosport_core
heroku pg:backups capture -a ss-core-dev &&
curl -o latest.dump `heroku pg:backups public-url -a ss-core-dev` &&
pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d somosport_core latest.dump

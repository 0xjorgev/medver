TODO.md

JORGE:
- Test separate files for Models (new knex implementation)
- Add Gulp Processes:
	- Gulp Watch --> nodaemon
	- Gulp Mocha --> Rams Unit Testing
	- Gulp JSHint --> Done!
- Test TypeScript Module
- Add Environment Vars --> Rams added via Gulpjs

Ramses
- Check should.js (BDD)
- Check faker(test data)

#Conventions

##Database
- Tables AKA Entities: plural snake_case lowercase, ex disciplines
- Columns: snake_case lowercase
- N:M Tables: lowercase entities alphabetic order
- *ALL* changes to the DB schema

##Javascript
- Javascript's standard convention
- Folder names should be lowercase and singular
- Use single quotes *always*

##Application code
- Model names should be CamelCase, first letter uppercased
- Route filenames should be <entity_name>_route.js
- URLs should be singular, as in "<server name>/user/:user_id"
- Local environment variables should be defined in a gulp task

##Tips
- When creating new tables on db, id fileds (discipline.id, subdiscipline.id, etc) shall be named <id>, <discipline_id> won't work on relational queries

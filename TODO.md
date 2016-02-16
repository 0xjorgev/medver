TODO.md

JORGE:
- Test separate files for Models
- Add Gulp Processes:
	- Gulp Watch
	- Gulp Mocha
	- Gulp JSHint
- Test TypeScript Module
- Add Environment Vars

Ramses
- Check should.js (BDD)
- Check faker(test data)

#Conventions

##Database
- Tables AKA Entities: plural snake_case lowercase, ex disciplines
- Columns: snake_case lowercase
- N:M Tables: lowercase entities alphabetic order
- *ALL* changes to the DB schema must be done through knex migrations

##Javascript
- Javascript's standard convention
- Folder names should be lowercase and singular
- Use single quotes *always*

##Application code
- Model names should be CamelCase, first letter uppercased
- Route filenames should be <entity_name>_route.js
- URLs should be singular, as in "<server name>/user/:user_id"
- Local environment variables should be defined in a gulp task

##Creación de Servicios REST

###frameworks utilizados

- Node.js
- Express.js
- Bookshelf
- Knex.js

###Estructura del proyecto

-App

	- model
		- team.js
		- match.js
		- index.js
		- base_model.js
		...
	- route
		- matches_route.js
		...
	- app.js
	- knexfile.js
	- package.json
	...

###1.- En la carpeta "model" agregar un nuevo archivo con nombre en singular asociado a una tabla especifica (ej:team.js, match.js).

####Contenido de clases modelo
	```javascript

		/**
 		* Created by george on 16/02/2016.
 		*/
		if (typeof define !== 'function') {
    		var define = require('amdefine')(module);
		}
		//1.
		define(['./base_model', './team'], function (DB) {
		//2.
    	var Match = DB.Model.extend({
        tableName: 'matches',
        hasTimestamps: true,
		 //4
         // relations
         team_a: function(){
             return this.belongsTo('Team', 'team_a');
         },
         team_b: function(){
             return this.belongsTo('Team', 'team_b');
         }
    });

    //3.
    return DB.model('Match', Match);
	});


//1. Se importa el modelo base (base_model) y los demas modelos requeridos en caso de existir relaciones entre ellos (en este caso './team')

//2. Se define una instancia del nuevo modelo y se extiende de DB.Model (Knex Model). Se asigna el nombre de la tabla y si contiene timesamps.

//3. Se retorna (registra), la instancia de nuestro nuevo modelo y se le asigna un nombre

//4. Ir a 5.2

###2.- Agregar el nuevo modelo a la clase index.js unicada en la carpeta model

####Contenido de la clase index.js
	```javascript
	/**
 	* Created by George on 17/02/16.
 	*/
	if (typeof define !== 'function') {
    	var define = require('amdefine')(module);
	}

	define([
    	'./user',
    	'./team',
    	'./match' //1.
	], function (User, Team, Match //2.) {

    	return {
    		user: User,
    		team: Team,
    		match: Match //3.
    	};
	});

//1. Se agrega una referencia al nuevo modelo recien creado (ej:'./match', se utiliza la sintaxis ./ porque se esta haciendo un llamado a un archivo fisico ubicado en la misma carpeta que contiene todos los modelos).

//2. Se pasa como parametro al callback una instancia del modelo recien agregado **"Match"**.

//3 Se asigna la instancia del nuevo modelo al nombre con el cual fue registrado en el paso 1.3 **"match: Match"**

### 3 Crear un route para el nuevo modelo, crear el archivo matches_route.js

####Contenido de la clase matches_route.js

	```javascript

	if (typeof define !== 'function') {
    	var define = require('amdefine')(module);
	}
	//1
	define(['express', '../model/index'], function (express, Models) {
	//2
    var router = express.Router();

	//Agregar metodos HTTP GET, POST, PUT y DELETE con su respectiav ruta

    	return router;
	});

//1 Se cargan todos los modelos disponibles en la clase **/model/index.js**

//2 Se crea una instancia del Router al cual le serán agregadas las rutas y con su respectivo método HTTP y la lógica de ejecución.

### 4 Agregar requests GET a matches_route.js

####Contenido de la clase matches_route.js

	```javascript

	if (typeof define !== 'function') {
    	var define = require('amdefine')(module);
	}
		define(['express', '../model/index'], function (express, Models) {
    	var router = express.Router();
    	//1
    	router.get('/list', function (req, res, next) {
    		//2
        	return Models.match
        	.where('active',true) 		// Condiciones del query
        	.where('played',false) 		// Condiciones del query
        	.fetchAll().then(function (result) { //Obtiene Todos los registros
            	if (result != null){
                	console.log('Match Found');
                	res.json(result);
            	} else {
                	console.log('Match not found');
                	res.status(404);
                	res.json({'error':'Match not found'});
            	}
        	}).catch(function(error){
            	console.log('Error!: ', error);
                res.status(500);
                res.json({'error':error.details});
        	});
    	});

    	return router;
	});

//1 Se agrega un manejador de requests de tipo GET en la ruta http://xxxxxx/list. Es una función Middleware, puede ser concatenada para agregar otros métodos (otros GET o cualquier método HTTP)

//2 retornamos un modelo de tipo **match** por el nombre con el cual fue registrado en 1.3

### 5 Agregar requests GET a matches_route.js para obtener data relacionada

####Contenido de la clase matches_route.js

	```javascript

	if (typeof define !== 'function') {
    	var define = require('amdefine')(module);
	}
		define(['express', '../model/index'], function (express, Models) {
    	var router = express.Router();
    	router.get('/list', function (req, res, next) {
        	return Models.match
        	.where('active',true)
        	.where('played',false)
			1//
        	.fetchAll({withRelated: ['team_a', 'team_b']}).then(function (result) { //Obtiene Todos los registros
            	if (result != null){
                	console.log('Match Found');
                	res.json(result);
            	} else {
                	console.log('Match not found');
                	res.status(404);
                	res.json({'error':'Match not found'});
            	}
        	}).catch(function(error){
            	console.log('Error!: ', error);
                res.status(500);
                res.json({'error':error.details});
        	});
    	});

    	return router;
	});

//1 Se agregan las tablas cuya data relacionada queremos obtener. Estas tablas a ser agregadas, deben ser llamadas con el mismo nombre con el cual
fueron definifueron definidas en el modelo en 1.1

//2 La sentancia **team_a: function(){ return this.belongsTo('Team', 'team_a');}** significa una relación 1:N entre Team y Match, donde Match tiene N equipos y cada equipo pertenece a un MATCH especifico. Se agrega el nombre del campo que dicta la relación entre las tablas en este caso para la tabla **match** es **team_a** que contiene el id del team relacionado

Este Error -> "[Error: The model historia could not be resolved from the registry plugin.]" significa que los nombres de las entidades / tablas, estan escritos con minuscula y deben estar con mayusculas ej: Category


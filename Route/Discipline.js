//Common to all modules
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

//Dependency 
var bookshelf = require("../Config/bookshelf");

//Model / Table
// var Discipline = bookshelf.Model.extend({
// 	//Model / Table  Name
//   	tableName: 'Discipline'
// });

var Discipline = require('../Model/Discipline');

var Subdiscipline = bookshelf.Model.extend({
	//Model / Table  Name
  	tableName: 'Subdiscipline',

  	discipline: function () {
       return this.belongsToMany(Discipline);
    }
});

router.get('/', function(request, response){
	//New Model / Table name
	new Discipline().fetchAll()
    	.then(function(disciplines) {
      		response.send(disciplines.toJSON());
    	})
    	.catch(function(error) {
      		console.log(error);
      		response.send('An error occured');
    	});
});

router.get('/nested/', function(request, response){
	//New Model / Table name
	new Subdiscipline().fetchAll()
    	.then(function(subdisciplines) {
    		console.log('Nested Result', subdisciplines);
      		response.send(subdisciplines.toJSON());
    	})
    	.catch(function(error) {
      		console.log(error);
      		response.send('An error occured');
    	});
});

router.get('/:idDiscipline', function(request, response){
	//New Model / Table name
	/*
	new Discipline().fetchAll()
    	.then(function(disciplines) {
      		response.send(disciplines.toJSON());
    	})
    	.catch(function(error) {
      		console.log(error);
      		response.send('An error occured');
    	});*/
});

router.post('/', function(request, response){

	console.log('Post Request on Discipline');
	response.end();
	//New Model / Table name
	/*
	new Discipline().fetchAll()
    	.then(function(disciplines) {
      		response.send(disciplines.toJSON());
    	})
    	.catch(function(error) {
      		console.log(error);
      		response.send('An error occured');
    	});*/
});

router.get('/rDiscipline', function(request, response){
	console.log('Get Request on rDiscipline');
	response.end();
	//New Model / Table name
	/*
	new Discipline().fetchAll()
    	.then(function(disciplines) {
      		response.send(disciplines.toJSON());
    	})
    	.catch(function(error) {
      		console.log(error);
      		response.send('An error occured');
    	});*/
});


module.exports = router;
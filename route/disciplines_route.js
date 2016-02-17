/**
 * Created by greg on 28/04/15.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express', '../model/index'], function (express, Models) {

    var router = express.Router();

    router.get('/', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        return Models.discipline.query(function(qb){
            qb.limit(25);
        }).fetchAll({withRelated: ['subdiscipline'], debug: true})
        .then(function (result) {
                res.json(result);
            });
    });


    router.get('/subdiscipline', function (req, res, next) {

        // tapping into Knex query builder to modify query being run
        return Models.subdiscipline.query(function(qb){
            qb.limit(25);
        }).fetchAll({withRelated: ['discipline'], debug: true})
        .then(function (result) {
                res.json(result);
            });
    });

    return router;
});

//V1.0
// //Common to all modules
// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// //Dependency
// // var bookshelf = require('../config/bookshelf');

// //Model / Table
// // var discipline = require('../model/discipline');
// // var subdiscipline = require('../model/subdiscipline');

// // var Discipline = bookshelf.Model.extend({
// //   //Model / Table  Name
// //     tableName: 'Discipline',
// //     Subdiscipline: function() {
// //        return this.hasMany(Subdiscipline, 'disciplineId');
// //     }
// // });

// // var Subdiscipline = bookshelf.Model.extend({
// // 	//Model / Table  Name
// //   	tableName: 'Subdiscipline',
// //     Discipline: function(){
// //       return this.belongsTo(Discipline, 'disciplineId');
// //     }
// // });



// router.get('/', function(request, response){
//   new discipline().fetchAll({withRelated:['Subdiscipline']})
//       .then(function(subdisciplines) {
//         console.log('Nested Result', subdisciplines);
//           response.send(JSON.stringify(subdisciplines));
//       })
//       .catch(function(error) {
//           console.log('Error on: ', error);
//           response.send('An error occured');
//       });
// });

// router.get('/:disciplineId', function(request, response){
//   //New Model / Table name
//   var discplineId = request.params.disciplineId;

//   new Discipline({'id': discplineId}).fetch({withRelated:['Subdiscipline']})
//       .then(function(subdisciplines) {
//         //console.log('Nested Result', subdisciplines);
//           response.send(subdisciplines.toJSON());
//       })
//       .catch(function(error) {
//           console.log(error);
//           response.send('An error occured');
//       });
// });

// router.get('/subdiscipline/', function(request, response){
// 	new Subdiscipline().fetch({withRelated:['Discipline']})
//     	.then(function(subdisciplines) {
//     		//console.log('Nested Result', subdisciplines);
//       		response.send(subdisciplines.toJSON());
//     	})
//     	.catch(function(error) {
//       		console.log(error);
//       		response.send('An error occured');
//     	});
// });

// router.get('/:subdisciplineId', function(request, response){
// 	//New Model / Table name
//   var subdisciplineId = request.params.subdisciplineId;
//   new Subdiscipline({'id': subdisciplineId}).fetch({withRelated:['Discipline']})
//       .then(function(subdisciplines) {
//         //console.log('Nested Result', subdisciplines);
//           response.send(subdisciplines.toJSON());
//       })
//       .catch(function(error) {
//           console.log(error);
//           response.send('An error occured');
//       });
// });

// router.post('/', function(request, response){

// 	console.log('Post Request on Discipline');
// 	response.end();
// 	//New Model / Table name
// 	/*
// 	new Discipline().fetchAll()
//     	.then(function(disciplines) {
//       		response.send(disciplines.toJSON());
//     	})
//     	.catch(function(error) {
//       		console.log(error);
//       		response.send('An error occured');
//     	});*/
// });

// router.get('/rDiscipline', function(request, response){
// 	console.log('Get Request on rDiscipline');
// 	response.end();
// 	//New Model / Table name
// 	/*
// 	new Discipline().fetchAll()
//     	.then(function(disciplines) {
//       		response.send(disciplines.toJSON());
//     	})
//     	.catch(function(error) {
//       		console.log(error);
//       		response.send('An error occured');
//     	});*/
// });


// module.exports = router;
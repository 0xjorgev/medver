var connString = 'postgres://rpjjyrwrvbfmyo:c4JJX-UqiY4eqwDPMvQk_pjiIU@ec2-54-225-165-132.compute-1.amazonaws.com:5432/d662a1395kh861';
//postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT:/*DATABASE*"
var pg = require('pg');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

	pg.connect(connString, function(err, client, done) {
		if(err) response.send("Could not connect to DB: " + err);
		client.query('SELECT * FROM Discipline', function(err, result) {
			done();
			console.log("My Rows ", result.rows);
			if(err) return response.status(status).send("My own Error: ", err);
			
			response.send(result.rows);
			//response.render('pages/index');
		});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



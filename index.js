//Import express -- its what runs the server

var express = require('express');
var app = express();

// Import mysql -- for the db interaction
var mysql = require('mysql');
// Sets up the connection to the db
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'siteUser',
	password: 'soupD00p',
	database: 'SSS'
});

//Import path so we can serve local files
var path = require('path');
//Define a certain path.
var htmldir = __dirname + "/html/";
var jsdir = __dirname + "/js/";
var cssdir = __dirname + "/css/";
var imgdir = __dirname + "/img/";

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//This handles requests to the main site. If you want to change which file gets served, or make content at runtime, change here
app.get('/', function(req, res) {
	res.sendFile(path.join(htmldir + "index.html"));
});

app.get('/getfoods', function(req, res) {
	connection.query(
		'SELECT name FROM objects order by RAND() limit 5',
		function(err, results, fields) {
			console.log(results);
		}
	);
	res.send('Foods are get.');
});

app.post('/vote', function(req, res) {
	console.log(req.body);
	var category = reg.body.category;
	var food = reg.body.uniqueid;
	var cookie = 1; // MAKE THIS MAKE SENSE
	connection.query(
		'INSERT INTO votes (object_id, user_id, category_id) values (?,?,?) ' +
		'WHERE NOT EXISTS (SELECT * FROM votes WHERE object_id = ? AND user_id = ?)',
		[food, cookie, category, food, cookie],
		function(err, results, fields) {
			console.log(results);
		}
	);
	res.send('Thanks for voting!');
});

app.post('/test', function(req, res) {

});

app.use('/js/', express.static(jsdir));

app.use('/css/', express.static(cssdir));

app.use('/img/', express.static(imgdir));

app.listen(80, function() {
	console.log("Listening on port 80...");
});

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

var bodyParser = require('body-parser');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//This handles requests to the main site. If you want to change which file gets served, or make content at runtime, change here
app.get('/', function(req, res) {
	res.sendFile(path.join(htmldir + "index.html"));
});

app.get('/getfoods', function(req, res) {
	//Connect to database here!
	res.send('Foods are get.');
});

app.post('/vote', function(req, res) {
	res.send('Thanks for voting for ' + req.body.uniqueid + '! You said it was ' + req.body.category);
});

app.use('/js/', express.static(jsdir));

app.use('/css/', express.static(cssdir));

app.listen(80, function() {
	console.log("Listening on port 80...");
});

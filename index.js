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

//Making cookies happen
var cookieParser = require('cookie-parser');
app.use(cookieParser());

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
app.use(function(req, res, next) {
	var cookie = req.cookies.sssID;
	if (typeof cookie === 'undefined') {
		var randomNumber=Math.random().toString();
		randomNumber=randomNumber.substring(2,randomNumber.length);
		res.cookie('sssID',randomNumber,{maxAge: 900000, httpOnly: true});
		console.log('made cookie' + randomNumber);
	} else {
		console.log('has cookie' + cookie);
	}
	next();
});

app.get('/', function(req, res) {
	res.sendFile(path.join(htmldir + "index.html"));
});

app.get('/getfoods', function(req, res) {
	connection.query(
		'SELECT * FROM objects order by RAND() limit 5',
		function(err, results, fields) {
			//console.log(results);
			res.send("{\"response\":" + JSON.stringify(results) + "}");
		}
	);
});

app.post('/vote', function(req, res) {
	// console.log(req.body);
	var category = req.body.category;
	var food = req.body.uniqueid;
	var cookie = req.cookies.sssID; // MAKE THIS MAKE SENSE
	var q1d = false, q2d = false, q3d = false, q4d = false;
	connection.query(
		'INSERT INTO votes (object_id, user_id, category_id) values (?,?,?) ',// +
		//'WHERE NOT EXISTS (SELECT * FROM votes WHERE object_id = ? AND user_id = ?)',
		[food, cookie, category],
		function(err, results, fields) {
			q1d = true;
			console.log("did this");
	var voteCounts = '{"soupVote":';
	connection.query(
		'select count(vote_id) from votes where object_id = ? and category_id = 0',
		[food],
		function(err, results, fields) {
			console.log(results[0]['count(vote_id)']);
			voteCounts += results[0]['count(vote_id)'] + ',"saladVote":';
			q2d = true;
			console.log("did this");

	connection.query(
		'select count(vote_id) from votes where object_id = ? and category_id = 1',
		[food],
		function(err, results, fields) {
			voteCounts += results[0]['count(vote_id)'] + ',"sandwichVote":';
			q3d = true;
			console.log("did this");

	connection.query(
		'select count(vote_id) from votes where object_id = ? and category_id = 2',
		[food],
		function(err, results, fields) {
			voteCounts += results[0]['count(vote_id)'] + ',"name":';
			q4d = true;
			console.log("did this");
			console.log(voteCounts);
	connection.query(
		'select name from objects where object_id = ?',
		[food],
		function(err, results, fields) {
			voteCounts += results[0]['name'] + '}';
			console.log("did this");
			res.send(voteCounts);
		});		
	
		}
	);
	//res.send('Thanks for voting!');
}
);
}
);
}
);
});

app.post('/test', function(req, res) {
	console.log("Test function working");
});

app.use('/js/', express.static(jsdir));

app.use('/css/', express.static(cssdir));

app.use('/img/', express.static(imgdir));

app.listen(80, function() {
	console.log("Listening on port 80...");
});

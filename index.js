var express = require('express');

var app = express();

var path = require('path');

var htmldir = __dirname + "/html/";


app.get('/', function(req, res) {
	res.sendFile(path.join(htmldir + "index.html"));
});

app.listen(80, function() {
	console.log("Listening on port 80...");
})

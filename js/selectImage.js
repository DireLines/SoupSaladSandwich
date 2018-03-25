var fs = require('fs');
var files = fs.readdirSync("img/");

function getImage() {
	do {
		index = Math.floor(Math.random() * files.length);
	} while (files[index] == ".DS_Store");
	console.log(files[index]);
	return files[index];
}

getImage();

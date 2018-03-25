$(document).ready(function(){
	getfoods();
});

//gets called once list of 5 random foods is recieved from database
function generateHTML(data) {
	//set food text
	parsedFoods = JSON.parse(data);
	$('div.food h1').text(parsedFoods.response[0].name.toUpperCase());
	//change image
	//TODO : replace with google image search
	$('.food').css('background-image','url("' + parsedFoods.response[0].path + '")');
	//assign vote functions to buttons

	var numVoted = 0;
	$('.button').click(function(){
		console.log("voting on thing!");
		numVoted++;
	});
}
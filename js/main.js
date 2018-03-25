$(document).ready(function(){
	$('.results').css('display','none');
	getfoods();
});
var numVoted = 0;
//gets called once list of 5 random foods is recieved from database
function generateHTML(data) {
	//set food text
	parsedFoods = JSON.parse(data);
	$('div.food h1').text(parsedFoods.response[0].name.toUpperCase());
	//change image
	//TODO : replace with google image search
	$('.food').css('background-image','url("' + parsedFoods.response[0].path + '")');
	//assign vote functions to buttons
	var foodnum = parsedFoods.response[0].object_id;
	$('.button').click(function(){
		console.log("voting on thing!");
		var category = 0;
		var id = this.id;
		if(id === 'soupbutton'){
			category = 0;
		}else if(id === 'saladbutton'){
			category = 1;
		} else{
			category = 2;
		}
		console.log(foodnum, category);
		 vote(foodnum,category);
		numVoted++;
		if(numVoted >= 5){
			console.log("going to results");
			goToResults();
		} else{
			console.log("showing next food");
			$('div.food h1').text(parsedFoods.response[numVoted].name.toUpperCase());
			$('.food').css('background-image','url("' + parsedFoods.response[numVoted].path + '")');
			foodnum = parsedFoods.response[numVoted].object_id;
		}
	});
}

function goToResults(){
	$('.quiz').css('display','none');
	$('.results').css('display','block');
}

function changeResultHTML(data){
	parsedVotes = JSON.parse(data);
	$('#r' +(numVoted)).innerHTML = ("Soup: " + parsedVotes.soupVote + "\n" + "Salad: " + parsedVotes.saladVote + "\n" + "Sandwich: " + parsedVotes.sandwichVote + "\n");
}
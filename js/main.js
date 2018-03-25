$(document).ready(function(){
	getfoods(5,5);
	var numVoted = 0;
		$('.button').click(function(){
			vote(1,0);
			vote(1,0);
			console.log("Button Press");
		});
});
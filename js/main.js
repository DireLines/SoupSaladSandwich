$(document).ready(function(){
	getfoods();
	var numVoted = 0;
		$('.button').click(function(){
			vote(1,0);
			vote(1,0);
			console.log("Button Press");
		});
});
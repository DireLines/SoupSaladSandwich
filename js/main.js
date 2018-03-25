$(document).ready(function(){
	getfoods();
		/*$('.button').mouseenter(function(){
				$(this).fadeTo(50,1);
		});
		$('.button').mouseleave(function(){
				$(this).fadeTo(100,0.7);
		});*/
		$('.button').click(function(){
			 // $('.food').css('background-image','/img/' + getImage());
			 vote(1,0);
			console.log("Button Press");
		});
});
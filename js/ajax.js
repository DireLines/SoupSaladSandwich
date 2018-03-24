//heres some javascript

var FoodType = {
	SOUP : 0,
	SALAD : 1,
	SANDWICH : 2
}

/**
 * vote(foodid, type)
 *
 * @param foodid: the uniqueid of the food being voted on
 * @param type: FoodType.SOUP, FoodType.SALAD, or FoodType.SANDWICH
 *
 * Sends a vote notification to the website
 *
 */

function vote(uniqueid, category) {
	var request = new XMLHttpRequest();
	var fd = new FormData();
	fd.append('uniqueid', foodid);
	fd.append('category', category);
	request.onreadystatechange = function() {
		if(request.readystate == 4 && request.status == 200) {
			//Handle any feedback from server here.
		}
	}
	request.open('POST', '/vote');
	request.send(fd);
}

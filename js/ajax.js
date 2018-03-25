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
	console.log("Called JS vote!");
	var request = new XMLHttpRequest();
	request.open('POST', '/vote');
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var fd = new FormData();
	fd.append('uniqueid', uniqueid);
	fd.append('category', category);
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			alert(request.responseText);
		}
	}
	request.send("uniqueid=" + uniqueid + "&category=" + category);
}

function getfoods() {
	console.log("Called JS getfoods!");
	var request = new XMLHttpRequest();
	request.open('GET', '/getfoods');
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200) {
			// alert(request.responseText);
			generateHTML(request.responseText);
		}
	}
	request.send();
}
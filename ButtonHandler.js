
function ButtonHandler(username , password, noradID) {

	fetchTLEFromServer(noradID, username, password);
	
	setInterval(function(){
	  longLat = convertTLEtoCoordinates(tleLine1,tleLine2);
    update(longLat);
    
	},3000);

}





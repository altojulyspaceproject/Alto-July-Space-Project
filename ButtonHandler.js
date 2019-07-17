
<<<<<<< HEAD
function ButtonHandler(username , password, noradID, groundLatitude, groundLongitude) {
var refreshCounter=0;
	fetchTLEFromServer(noradID, username, password);
	setTimeout(function(){
		plotReal(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // plot function to initiate the map
	
	},3000);
		setInterval(function(){
		newLatLongPlotData(tleLine1,tleLine2) //retriveing new lat/long data for the map 

		longLat = convertTLEtoCoordinates(tleLine1,tleLine2); // new data for the google maps 
		update(longLat); // updates the google maps 
=======
function ButtonHandler(username , password, noradID) {

	fetchTLEFromServer(noradID, username, password);
	
	setInterval(function(){
	  longLat = convertTLEtoCoordinates(tleLine1,tleLine2);
    update(longLat);
    
	},3000);
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9

		setTimeout(function(){ 
		plotReal1(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // updating the plot 
		},500);
		},3000);
}
<<<<<<< HEAD
console.log(latlongHolder );
=======




>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9

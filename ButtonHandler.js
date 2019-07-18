
function ButtonHandler(username , password, noradID, GSLat, GSLon,GSAlt,AntAz,AntEl,AntAlt) {
var refreshCounter=0;
	fetchTLEFromServer(noradID, username, password);
	setTimeout(function(){
		plotReal(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // plot function to initiate the map
	
	},3000);
		setInterval(function(){
		newLatLongPlotData(tleLine1,tleLine2) //retriveing new lat/long data for the map 

		longLat = convertTLEtoCoordinates(tleLine1,tleLine2); // new data for the google maps 
		update(longLat); // updates the google maps 
console.log(longLat)
		setTimeout(function(){ 
		plotReal1(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // updating the plot 
		},500);
		// var SatAlt = document.getElementById("dataAltitude").value;
		// var GS = [GSLon,GSLat,GSAlt];
		// var Sat = [longLat.long,longLat.lat,SatAlt];
		// var Ant = [AntAz,AntEl,AntAlt];
		var newAnt = compareAzEl(AntAz,AntEl);
		antAz = newAnt[0];
		antEl = newAnt[1];
		},3000);
}
console.log(latlongHolder );


/**
 * 
 * tle to coordinates conversion functions
 * tleToCoordinates.js
 *
 *
 * converts the TLE data to longitude and latitude data
 * 
 * Author: Craig Robinson (From satellite.js)
 * Last Modified date: 4/07/2019
 * 
 * Requirements: satellite.js 
 * 
 * Usage: 
 * Include package in html using: <script src="tleToCoordinates.js"></script>
 * use functions as required
 * 
 * Globals:
 * longLat = JSON of current longitude and latitude data
 * tleLine1,tleLine2 TLE data for the user defined TLE from NORAD  
*/

var longLat = {long:0, lat:0};
var tleLine1;
var tleLine2;

function convertTLEtoCoordinates(tleLine1,tleLine2){

   // Initialize a satellite record
   var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

   //  Propagate satellite using time since epoch (in minutes).
   // var positionAndVelocity = satellite.sgp4(satrec, timeSinceTleEpochMinutes);

   //  Or you can use a JavaScript Date
   var positionAndVelocity = satellite.propagate(satrec, new Date());

   // The position_velocity result is a key-value pair of ECI coordinates.
   // These are the base results from which all other coordinates are derived.
   var positionEci = positionAndVelocity.position,
       velocityEci = positionAndVelocity.velocity;

   // Set the Observer at 122.03 West by 36.96 North, in RADIANS
   var observerGd = {
       longitude: satellite.degreesToRadians(-122.0308),
       latitude: satellite.degreesToRadians(36.9613422),
       height: 0.370
   };

   // You will need GMST for some of the coordinate transforms.
   // http://en.wikipedia.org/wiki/Sidereal_time#Definition
  
   var gmst = satellite.gstime(new Date());

   // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
   var positionEcf   = satellite.eciToEcf(positionEci, gmst),
       observerEcf   = satellite.geodeticToEcf(observerGd),
       positionGd    = satellite.eciToGeodetic(positionEci, gmst),
       lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf),
       velocityEcf   = satellite.eciToEcf(velocityEci, gmst),
       dopplerFactor = satellite.dopplerFactor(observerEcf, positionEcf, velocityEcf);

   // The coordinates are all stored in key-value pairs.
   // ECI and ECF are accessed by `x`, `y`, `z` properties.
   var satelliteX = positionEci.x,
       satelliteY = positionEci.y,
       satelliteZ = positionEci.z;

   // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
   var azimuth   = lookAngles.azimuth,
       elevation = lookAngles.elevation,
       rangeSat  = lookAngles.rangeSat;

   // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
   var longitude = positionGd.longitude,
       latitude  = positionGd.latitude,
       height    = positionGd.height;

   //  Convert the RADIANS to DEGREES for pretty printing (appends "N", "S", "E", "W", etc).
   var longitudeStr = satellite.degreesLong(longitude),
       latitudeStr  = satellite.degreesLat(latitude);

      //  console.log(longitudeStr);
      //  console.log(latitudeStr);

    longLat = {long:longitudeStr,lat:latitudeStr};
	update(longLat);
    return longLat;
}


function convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,minutesToOffset){

  Date.prototype.addMinutes = function(m) {
    this.setTime(this.getTime() + (m*60*1000));
    return this;
  }
  var offsetDate = new Date(); 
  offsetDate.addMinutes(minutesToOffset);

   // Initialize a satellite record
  var satrec = satellite.twoline2satrec(tleLine1, tleLine2);

  //  Propagate satellite using time since epoch (in minutes).
  // var positionAndVelocity = satellite.sgp4(satrec, timeSinceTleEpochMinutes);

  //  Or you can use a JavaScript Date
  var positionAndVelocity = satellite.propagate(satrec, offsetDate);

  // The position_velocity result is a key-value pair of ECI coordinates.
  // These are the base results from which all other coordinates are derived.
  var positionEci = positionAndVelocity.position,
      velocityEci = positionAndVelocity.velocity;

  // Set the Observer at 122.03 West by 36.96 North, in RADIANS
  var observerGd = {
      longitude: satellite.degreesToRadians(-122.0308),
      latitude: satellite.degreesToRadians(36.9613422),
      height: 0.370
  };

  // You will need GMST for some of the coordinate transforms.
  // http://en.wikipedia.org/wiki/Sidereal_time#Definition
 
  var gmst = satellite.gstime(offsetDate);

  // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
  var positionEcf   = satellite.eciToEcf(positionEci, gmst),
      observerEcf   = satellite.geodeticToEcf(observerGd),
      positionGd    = satellite.eciToGeodetic(positionEci, gmst),
      lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf),
      velocityEcf   = satellite.eciToEcf(velocityEci, gmst),
      dopplerFactor = satellite.dopplerFactor(observerEcf, positionEcf, velocityEcf);

  // The coordinates are all stored in key-value pairs.
  // ECI and ECF are accessed by `x`, `y`, `z` properties.
  var satelliteX = positionEci.x,
      satelliteY = positionEci.y,
      satelliteZ = positionEci.z;

  // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
  var azimuth   = lookAngles.azimuth,
      elevation = lookAngles.elevation,
      rangeSat  = lookAngles.rangeSat;

  // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
  var longitude = positionGd.longitude,
      latitude  = positionGd.latitude,
      height    = positionGd.height;

  //  Convert the RADIANS to DEGREES for pretty printing (appends "N", "S", "E", "W", etc).
  var longitudeStr = satellite.degreesLong(longitude),
      latitudeStr  = satellite.degreesLat(latitude);

      //Used to update the details on the side of the main page.
      document.getElementById("dataLatitude").value = latitudeStr;
      document.getElementById("dataLongitude").value = longitudeStr;
      document.getElementById("dataAltitude").value = height;
      document.getElementById("dataTime").value = 2787;
      document.getElementById("dataAzimuth").value = 0;
      document.getElementById("dataElevation").value = 9001;

   var longLat = {long:longitudeStr,lat:latitudeStr};
   return longLat;
 
}




/** 
 * 
 * Fetches TLE data from remote server (space-track.org)
 * 
 * Then uses a global to set the longitude and latitude 
 * 
 * 
 */
var latlongHolder=[];
function fetchTLEFromServer(noradID, username, password){

	

  $.ajax({
              
    url: 'http://localhost:8080/postExternal?noradID=' + noradID + '&username=' + username + '&password=' + password,
    type: 'POST',
    success: function(output) {
        
      //Parse the data coming from Space-Track
      TLEdata = JSON.parse(output)[0];
      console.log(TLEdata);
      //If successful 
      //Todo: error handling 
      if(TLEdata != undefined){
         tleLine1 = TLEdata["TLE_LINE1"];
         tleLine2 = TLEdata["TLE_LINE2"];
      }

      var latHolder = [];
      var latHolderPrevious = [];
      var longHolder = [];
      var longHolderPrevious = [];
    
<<<<<<< HEAD:tleToCoordinates.js
    
=======
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9:JS/V1/tleToCoordinates.js
      for(var i = 0; i <= 90; i++){
        var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,i); 
        latHolder.push( parseFloat(returned["lat"]));
        longHolder.push(parseFloat(returned["long"]));
      }
      for(var i = 0; i <= 90; i++){
        var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,-i); 
        latHolderPrevious.push( parseFloat(returned["lat"]));
        longHolderPrevious.push(parseFloat(returned["long"]));
      }
<<<<<<< HEAD:tleToCoordinates.js
       latlongHolder = [latHolder,longHolder,latHolderPrevious,longHolderPrevious];

       return(latlongHolder);
    }
   });


}

    function plotReal(latHolder,longHolder,latHolderPrevious,longHolderPrevious){
      var container = document.getElementById("plotlyGraph");
      // var allPlotLat = [latHolder, latHolderPrevious, latHolder[0],circleCoords[0]];
      // var allPlotLon =[longHolder, longHolderPrevious, longHolder[0],circleCoords[1]];
      //var allTraceNames = ['Future path','Previous path','Object location','Footprint'];
      //var allPlotType = ['markers', 'markers', 'markers', 'lines'];
      //dataPlot(container,latHolder,longHolder,latHolderPrevious,longHolderPrevious,"red",6);
      //Plot GS location
      dataPlot(document.getElementById("plotlyGraph"),document.getElementById("Latitude").value,document.getElementById("Longitude").value,'GS','markers','purple',15);
      //Plot future path
      dataPlot(container,latHolder,longHolder,'Future path','markers',"red",6);
      //Plot past path
      dataPlot(container,latHolderPrevious,longHolderPrevious,'Previous path','markers',"yellow",6);
      //Plot object location
      dataPlot(container,latHolder[0],longHolder[0],'Object location','markers',"pink",10);
=======


      var container = document.getElementById("plotlyGraph");
      // dataPlot(container,latHolder,longHolder,latHolderPrevious,longHolderPrevious);
      //Plot future path
      dataPlot(container,latHolder,longHolder,'Future path','markers');
      //Plot past path
      dataPlot(container,latHolderPrevious,longHolderPrevious,'Previous path','markers');
      //Plot object location
      dataPlot(container,latHolder[0],longHolder[0],'Object location','markers');
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9:JS/V1/tleToCoordinates.js
      //Calculate the radius of visible Earth
      var Radius = footprintRadius(latHolder[0],420);
      //Turns the radius into lat/lon coords
      var circleCoords = footprintPlot(latHolder[0],longHolder[0], Radius);
      //Plot the visible Earth
<<<<<<< HEAD:tleToCoordinates.js
      dataPlot(container,circleCoords[0],circleCoords[1],'Footprint','lines',"blue",6);
      //dataPlot(container,allPlotLat,allPlotLon,allTraceNames,allPlotType);
      return;
=======
      dataPlot(container,circleCoords[0],circleCoords[1],'Footprint','lines');

>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9:JS/V1/tleToCoordinates.js
    }   

    function plotReal1(latHolder,longHolder,latHolderPrevious,longHolderPrevious){
    
        var container = document.getElementById("plotlyGraph");
         //dataPlotUpdate(container,latHolder,longHolder,latHolderPrevious,longHolderPrevious,0);
        //Plot future path

       // var allPlotLat = [latHolder, latHolderPrevious, latHolder[0],circleCoords[0]];
        //var allPlotLon =[longHolder, longHolderPrevious, longHolder[0],circleCoords[1]];
        //var allTraceNames = ['Future path','Previous path','Object location','Footprint'];
        //var allPlotType = ['markers', 'markers', 'markers', 'lines'];
        //Plot GS location
        dataPlotUpdate(document.getElementById("plotlyGraph"),document.getElementById("Latitude").value,document.getElementById("Longitude").value,'GS','markers','purple',15);
        //Plot future path
        dataPlotUpdate(container,latHolder,longHolder,'Future path','markers',"red",6);
        //Plot past path
        dataPlotUpdate(container,latHolderPrevious,longHolderPrevious,'Previous path','markers',"yellow",6);
        //Plot object location
       dataPlotUpdate(container,latHolder[0],longHolder[0],'Object location','markers',"pink",15);
        //Calculate the radius of visible Earth
        var Radius = footprintRadius(latHolder[0],420);
        
        //Turns the radius into lat/lon coords
        var circleCoords = footprintPlot(latHolder[0],longHolder[0], Radius);
        //Plot the visible Earth
        dataPlotUpdate(container,circleCoords[0],circleCoords[1],'Footprint','lines',"blue",6);
      // dataPlotUpdate(container,allPlotLat,allPlotLon,allTraceNames,allPlotType);
        return;
  
      }   

function newLatLongPlotData(tleLine1,tleLine2){ 
    // a new function for updating the map data 
var latHolder = [];
var latHolderPrevious = [];
var longHolder = [];
var longHolderPrevious = [];


for(var i = 0; i <= 90; i++){
  var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,i); 
  latHolder.push( parseFloat(returned["lat"]));
  longHolder.push(parseFloat(returned["long"]));
}
for(var i = 0; i <= 90; i++){
  var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,-i); 
  latHolderPrevious.push( parseFloat(returned["lat"]));
  longHolderPrevious.push(parseFloat(returned["long"]));
}
 latlongHolder = [latHolder,longHolder,latHolderPrevious,longHolderPrevious];

 return(latlongHolder);

}
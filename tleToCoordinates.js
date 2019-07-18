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
      //  longitude: satellite.degreesToRadians(-122.0308),
      //  latitude: satellite.degreesToRadians(36.9613422),
       longitude: satellite.degreesToRadians(144.9633),       
       latitude: satellite.degreesToRadians(-37.8141),
       height: 0.054
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

    longLat = {long:longitudeStr,lat:latitudeStr,alt:height,azimuth:azimuth,elevation:elevation,rangeSat:rangeSat};
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

   var longLat = {long:longitudeStr,lat:latitudeStr,alt:height};
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
      
        //If successful 
        //Todo: error handling 
        if(TLEdata != undefined){
          tleSatName = TLEdata["OBJECT_NAME"];
          tleEpoch = TLEdata["EPOCH"]; 
          tleLine0 = TLEdata["TLE_LINE0"];
          tleLine1 = TLEdata["TLE_LINE1"];
          tleLine2 = TLEdata["TLE_LINE2"];
        }

        var latHolder = [];
        var latHolderPrevious = [];
       
        var longHolder = [];
        var longHolderPrevious = [];
        
        var altHolder = [];
        var altHolderPrevious = [];
      
      
        for(var i = 0; i <= 90; i++){
          var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,i); //Convert TLE to long,lat
          latHolder.push( parseFloat(returned["lat"]));  //Get +90 minutes of latitude
          longHolder.push(parseFloat(returned["long"])); //Get +90 minutes of longitude
          altHolder.push(parseFloat(returned["alt"])); //Get +90 minutes of altitude

          var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,-i);  //Convert TLE to long,lat
          latHolderPrevious.push( parseFloat(returned["lat"])); //Get -90 minutes of latitude
          longHolderPrevious.push(parseFloat(returned["long"])); //Get -90 minutes of longitude
          altHolderPrevious.push(parseFloat(returned["alt"])); //Get -90 minutes of altitude
        }

        var currentSatelliteData = convertTLEtoCoordinates(tleLine1,tleLine2);
        latlongHolder = [latHolder,longHolder,latHolderPrevious,longHolderPrevious];

        window.localStorage.clear();

        var satelliteData = {
          "satName":tleSatName,
          "epoch":tleEpoch,
          "tleLine0":tleLine0,
          "tleLine1":tleLine1,
          "tleLine2":tleLine2,

          "lat":currentSatelliteData["lat"],
          "long":currentSatelliteData["long"],
          "altitude":currentSatelliteData["alt"],

          "satJSAziumth":currentSatelliteData["azimuth"],
          "satJSelevation":currentSatelliteData["elevation"],
          "satJSrangeSat":currentSatelliteData["rangeSat"],

          "nextLat90":latHolder,
          "nextLong90":longHolder,
          "nextAlt90":altHolder,
          
          "prevLat90":latHolderPrevious,
          "prevLong90":longHolderPrevious,
          "prevAlt90":altHolderPrevious,
         
          "gsLat":-37.8141,
          "gsLong":144.9633,
          "gsAlt":0.054
        };


        //For each value in Satellite Data, write this to a key value pair, and write to local storage
        for ( let prop in satelliteData){
          var key = prop; 
          var value = satelliteData[prop];
          window.localStorage.setItem(key, JSON.stringify(value));

        };
        return(latlongHolder);
      }
  });


}

    function plotReal(){
      
      var latHolder = JSON.parse(window.localStorage.getItem('nextLat90'));
      var longHolder = JSON.parse(window.localStorage.getItem('nextLong90'));
      var latHolderPrevious = JSON.parse(window.localStorage.getItem('prevLat90'));
      var longHolderPrevious = JSON.parse(window.localStorage.getItem('prevLong90'));

      var gsLatitude = JSON.parse(window.localStorage.getItem('gsLat'));
      var gsLongitude = JSON.parse(window.localStorage.getItem('gsLong'));
    
      var container = document.getElementById("plotlyGraph");

      //Plot GS location
      dataPlot(container,gsLatitude,gsLongitude,'GS','markers','purple',15);
      //Plot future path
      dataPlot(container,latHolder,longHolder,'Future path','markers',"red",6);
      //Plot past path
      dataPlot(container,latHolderPrevious,longHolderPrevious,'Previous path','markers',"yellow",6);
      //Plot object location
      dataPlot(container,latHolder[0],longHolder[0],'Object location','markers',"pink",10);
      //Calculate the radius of visible Earth
      var Radius = footprintRadius(latHolder[0],420);
      //Turns the radius into lat/lon coords
      var circleCoords = footprintPlot(latHolder[0],longHolder[0], Radius);
      //Plot the visible Earth
      dataPlot(container,circleCoords[0],circleCoords[1],'Footprint','lines',"blue",6);
      //dataPlot(container,allPlotLat,allPlotLon,allTraceNames,allPlotType);
      return;
    }   

    function plotReal1(){
    
      var latHolder = JSON.parse(window.localStorage.getItem('nextLat90'));
      var longHolder = JSON.parse(window.localStorage.getItem('nextLong90'));
      var latHolderPrevious = JSON.parse(window.localStorage.getItem('prevLat90'));
      var longHolderPrevious = JSON.parse(window.localStorage.getItem('prevLong90'));

      var gsLatitude = JSON.parse(window.localStorage.getItem('gsLat'));
      var gsLongitude = JSON.parse(window.localStorage.getItem('gsLong'));

      var container = document.getElementById("plotlyGraph");
  
      //Plot GS location
      dataPlotUpdate(container,gsLatitude,gsLongitude,'GS','markers','purple',15);
      
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




function updateLocalStorageSatelliteData(){

  //Needs to update local storage for current lat,long,alt 

  var currentSatelliteData = convertTLEtoCoordinates(tleLine1,tleLine2);
  var satelliteData = {
    "lat":currentSatelliteData["lat"],
    "long":currentSatelliteData["long"],
    "altitude":currentSatelliteData["alt"],

    "satJSAziumth":currentSatelliteData["azimuth"],
    "satJSelevation":currentSatelliteData["elevation"],
    "satJSrangeSat":currentSatelliteData["rangeSat"],
  }
  //Update all values in local storage
  for ( let prop in satelliteData){
    var key = prop; 
    var value = satelliteData[prop];
    window.localStorage.setItem(key, JSON.stringify(value));
   
  };

}



function updateLocalStorageTimeData(){
  // a new function for updating the map data 
  var latHolder = [];
  var latHolderPrevious = [];
  var altHolder = [];
  var longHolder = [];
  var longHolderPrevious = [];
  var altHolderPrevious = [];

  for(var i = 0; i <= 90; i++){
    var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,i); //Convert TLE to long,lat
    latHolder.push( parseFloat(returned["lat"]));  //Get +90 minutes of latitude
    longHolder.push(parseFloat(returned["long"])); //Get +90 minutes of longitude
    altHolder.push(parseFloat(returned["alt"])); //Get +90 minutes of altitude

    var returned = convertTLEtoCoordinatesTimeOffset(tleLine1,tleLine2,-i);  //Convert TLE to long,lat
    latHolderPrevious.push( parseFloat(returned["lat"])); //Get -90 minutes of latitude
    longHolderPrevious.push(parseFloat(returned["long"])); //Get -90 minutes of longitude
    altHolderPrevious.push(parseFloat(returned["alt"])); //Get -90 minutes of altitude
  }

  var satelliteData = {

    "nextLat90":latHolder,
    "nextLong90":longHolder,
    "nextAlt90":altHolder,
    
    "prevLat90":latHolderPrevious,
    "prevLong90":longHolderPrevious,
    "prevAlt90":altHolderPrevious,
  };

  //Loop through and write updated values to local storage
  for ( let prop in satelliteData){
    var key = prop; 
    var value = satelliteData[prop];
    window.localStorage.setItem(key, JSON.stringify(value)); 
  };


}
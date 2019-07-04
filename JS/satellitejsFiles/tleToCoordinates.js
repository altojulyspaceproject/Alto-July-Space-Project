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
 *     
*/


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

       console.log(longitudeStr);
       console.log(latitudeStr);

   var longLat = {long:longitudeStr,lat:latitudeStr};
  return longLat;
}
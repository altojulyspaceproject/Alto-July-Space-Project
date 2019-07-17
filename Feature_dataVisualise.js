/**
 * Feature_dataVisualise.js
 *
 *
 * Plots the input data on a map in the provided div container.
 * 
 * Author: Matthew Auld + Stephanie Batten
<<<<<<< HEAD
 * Last Modified date: 17/07/2019
=======
 * Last Modified date: 12/07/2019
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
 * 
 * Requirements: plotly.js
 * Found here: https://plot.ly/javascript/getting-started/
 * 
 * Usage: 
 * 
 * Include package in html using: <script src="Feature_dataVisulaise.js"></script>
 * 
 * Inputs:
 *        container - The container you want the plot to be shown in
 *        latitude  - The latitude array of what you wish to show
 *        longitude - The longitude array of what you wish to show
 *        name      - The name of the trace
 *        marker    - The mode of marking (markers or lines)
 *
 * Outputs:
 *        Plots the input data in a graph within the container you provided.
*/


<<<<<<< HEAD
function dataPlot(container, latitude, longitude, name, marker,color,size){
=======
function dataPlot(container, latitude, longitude, name, marker){
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
      // Creates the isArray prototype in all arrays? Needed to see fi input is an array or not,
      Array.prototype.isArray = true;
      // Create the trace object
      if(latitude.isArray && longitude.isArray){
        var trace = {
            // If testing replace latitude with val and longitude with idx
            lat: latitude,         // Latitude
            lon: longitude,        // Longitude
            name: name,            // Name of trace
<<<<<<< HEAD
            ids:name,              // id of trace 
            mode: marker,          // Mode of marking
            type: 'scattermapbox', // Type of map trace is going into
            connectgaps: true,
            marker: {size:size, color:color},
            line: {size:size, color:color}
=======
            mode: marker,          // Mode of marking
            type: 'scattermapbox', // Type of map trace is going into
            connectgaps: true
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
        };
      }
      else{
        var trace = {
          // If testing replace latitude with val and longitude with idx
            lat: [latitude],       // Latitude
            lon: [longitude],      // Longitude
<<<<<<< HEAD
            name: name,           // Name of trace
            ids:name,             //id of trace
            mode: marker,          // Mode of marking
            type: 'scattermapbox', // Type of map trace is going into
            connectgaps: true,
            marker: {size:size, color:color},
            line: {size:size, color:color}
=======
            name: name,            // Name of trace
            mode: marker,          // Mode of marking
            type: 'scattermapbox', // Type of map trace is going into
            connectgaps: true
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
        };
      }
    // Create the layout object for the map
      layout = {
          mapbox: { 
<<<<<<< HEAD
            style: 'satellite',
            centre: {lat:latitude,lon:longitude},
          }, 
          showlegend:false,
=======
            style: 'dark'
          }, 
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
          margin: {
            r: 0, 
            t: 0, 
            b: 0, 
            l: 0, 
            pad: 0
          }, 
       };
    // Mapbox access token for getting the map.
      Plotly.setPlotConfig({
          mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
      })
<<<<<<< HEAD
      
=======
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
    // function that actually generates the map.
      Plotly.plot(container, [trace], layout);
  }

  function footprintRadius(latitude, altitude){
    //  Fixed variables
    var rEquitorial = 6356; // Radius of Earth at equator
    var rPolar = 6356.8;    // Radius of Earth at Pole
    //  Usable Earth radius taking into account the oblateness of the Earth.
    var latitude2 = latitude * Math.PI / 180;
    var rEarth = rEquitorial * rPolar / Math.sqrt( Math.pow(rPolar,  2) * Math.pow(Math.cos(latitude2), 2) + Math.pow(rEquitorial,2) * Math.pow(Math.sin(latitude2), 2) );
    //  Angle of the right angle triangle that connects the centre of the Earth to the object and to the tangential line of the object to the Earth.
    var thetaA = Math.asin(rEarth / (altitude + rEarth));
    //  Distance from the object to the horizon along a tangential line using the angle of the right angle triangle with hypontenuse along the same line (thetaA).
    var distHoriz = rEarth / Math.tan(thetaA);
    //  Perpendicular distance from the line that connects the object to the center of the EArth (polar axis) to the point on the horizon tangential to the Earth.
    var lengthRight = distHoriz * Math.sin(thetaA);
    //  Angle between the polar axis and the radius of the Earth connecting to the point on the horizon.
    var theta = Math.asin(lengthRight / rEarth);
    //  The distance that defines the radius of the footprint of the object.
    var radius = rEarth * (theta);// - 5 * Math.PI / 180); // In the same units as altitude input.

    return radius;
}

function footprintPlot(latitude, longitude, radius) {
<<<<<<< HEAD
  //creating an array of angles from 0-2pi with a steo size of pi/50 to define the distance between points around the circle 
=======
    //creating an array of angles from 0-2pi with a steo size of pi/50 to define the distance between points around the circle 
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
    var N = 2 * Math.PI / (Math.PI / 50);
    var initialVal = 0;
    var finalVal = 2*Math.PI;
    var angleCirc = [];
    for (var i = 0; i < N; i++) {
      angleCirc.push(initialVal + finalVal * i / N);
    }
<<<<<<< HEAD
    // defining the distance from the centre of the circle to each point on the circle in the horizontal direction using the relation cos(angle)  = a/h where a is the vertical distance, h is the radius of the footprint
    var xunit = angleCirc.map(x => radius * Math.sin(x));
    // defining the distance from the centre of the circle to each point on the circle in the vertical direction using the relation sin(angle)  = o/h where o is the horizontal distance, h is the radius of the footprint
    var yunit = angleCirc.map(x => radius * Math.cos(x));
    // converting the xunit value from a km value to a value in degrees and then adding the latitude position of the satellite, to determine the latitude position of points on the circle
    var latitudeCirc = xunit.map( x => x * 180 / 6372 / Math.PI + latitude);
=======
    console.log(angleCirc);
    // defining the distance from the centre of the circle to each point on the circle in the horizontal direction using the relation cos(angle)  = a/h where a is the vertical distance, h is the radius of the footprint
    var xunit = angleCirc.map(x => radius * Math.sin(x));
    // console.log('xUnit(km):');
    // console.log(xunit);
    // defining the distance from the centre of the circle to each point on the circle in the vertical direction using the relation sin(angle)  = o/h where o is the horizontal distance, h is the radius of the footprint
    var yunit = angleCirc.map(x => radius * Math.cos(x));
    // console.log('yUnit(km):');
    // console.log(yunit);
    // converting the xunit value from a km value to a value in degrees and then adding the latitude position of the satellite, to determine the latitude position of points on the circle
    var latitudeCirc = xunit.map( x => x * 180 / 6372 / Math.PI + latitude);
    // console.log('latitudeCirc(deg):');
    // console.log(latitudeCirc);
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9
    // converting the yunit value from a km value to a value in degrees and then adding the longitude position of the satellite, to determine the longitude position of points on the circle 
    var distance = new Array(xunit.length);

    for (var i = 0; i < xunit.length; i++){
        distance[i] = yunit[i] / Math.PI * 180 / 6372 / Math.cos(latitudeCirc[i] * Math.PI / 180);
    }
<<<<<<< HEAD
    var longitudeCirc = distance.map( x => x + longitude);
    // adjusting the latitude and longitude values for when the satellite foot print is over a pole, this is necessary because latitude values must fall between -90 and 90 and when passing the poles values increase past 90 ie at 100 degrees we are actually at a latitude of 80 as we have gone past the pole by 10 degrees or in other words we have moved down 10 degrees from the top.  
    for (var check=0; check < N; check++) {
      //when the latitude is over the north pole the latitude values will need to be adjusted to be less than 90 and the longitude values will need to be offset by 180. ie at lat 100, the latitude needs to be adjusted to 80 as we have gone past the pole by 10
      if (latitudeCirc[check]>90){
        latitudeCirc[check]=latitudeCirc[check]-90;// subtract 90 to find how many degrees past the pole north we are 
        latitudeCirc[check]=90-latitudeCirc[check]; // subtract the number of degrees past the pole from 90 to find our new postion  
        longitudeCirc[check]=longitudeCirc[check]+180; // offset by 180 as we are now on the opposite side of the pole
      }
      //when the latitude is over the south pole the latitude values will need to be adjusted to be more than -90 and longitude values need to be offset by 180. ie at lat -100, the latitude has gone past the pole by 10 degrees and needs to be adjusted to -80
      if (latitudeCirc[check]<-90){
        latitudeCirc[check]=latitudeCirc[check]+90;//add 90 to find how many degrees past the south pole we are (in this case we add as the latitude is negative)
        latitudeCirc[check]=-90-latitudeCirc[check]; // subtract the difference from -90, the south pole is at -90 and the difference will be a negative number, therefore by subtracting we are actually adding 
        longitudeCirc[check]=longitudeCirc[check]+180; // offsetting the longitude to end up on the opposite side of the pole 
      }
    }
    latitudeCirc.push(latitudeCirc[0]);
    longitudeCirc.push(longitudeCirc[0]);
    return [latitudeCirc, longitudeCirc]; // our output arguments will be in the form of two arrays, one fore each latitude value and one for each longitude value 
    }

    function dataPlotUpdate(container, latitude, longitude, name, marker,color,size){ 
    // same function as dataPlot, just with the Plotly.restyle function to clear the traces
    // Creates the isArray prototype in all arrays? Needed to see fi input is an array or not,
    Array.prototype.isArray = true;
    // Create the trace object
    if(latitude.isArray && longitude.isArray){
      var trace = {
        // If testing replace latitude with val and longitude with idx
        lat: latitude,         // Latitude
        lon: longitude,        // Longitude
        name: name,            // Name of trace
        ids:name,              // id of trace 
        mode: marker,          // Mode of marking
        type: 'scattermapbox', // Type of map trace is going into
        connectgaps: true,
        marker: {size:size, color:color},
        line: {size:size, color:color}
      };
    }
    else{
      var trace = {
        // If testing replace latitude with val and longitude with idx
          lat: [latitude],       // Latitude
          lon: [longitude],      // Longitude
          name: name,           // Name of trace
          ids:name,             //id of trace
          mode: marker,          // Mode of marking
          type: 'scattermapbox', // Type of map trace is going into
          connectgaps: true,
          marker: {size:size, color:color},
          line: {size:size, color:color}
      };
    }
   // Create the layout object for the map
     layout = {
         'mapbox.style':'satellite',
           'mapbox.centre':{latitude,longitude},
         'showlegend':'false'
      };
   // Mapbox access token for getting the map.
     Plotly.setPlotConfig({
         mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
     })
      //Plotly.restyle(container,trace); // clearing the traces 
      Plotly.deleteTraces(container,0)
      Plotly.plot(container, [trace],layout); // creating a new plot 
       
      
   
     
  }
=======
    // console.log('distance:');
    // console.log(distance);
    //var conversionFactor = Math.cos(latitudeCirc * Math.PI / 180) * 111.32;
    // var distance = yunit.map(x => x/Math.PI * 180 /6372 / xunit.map(y => Math.cos(y)));
    var longitudeCirc = distance.map( x => x + longitude);
    // console.log('longitudeCirc(deg):');
    // console.log(longitudeCirc);
    // adjusting the latitude and longitude values for when the satellite foot print is over a pole, this is necessary because latitude values must fall between -90 and 90 and when passing the poles values increase past 90 ie at 100 degrees we are actually at a latitude of 80 as we have gone past the pole by 10 degrees or in other words we have moved down 10 degrees from the top.  
    for (var check=0; check < N; check++) {
        //when the latitude is over the north pole the latitude values will need to be adjusted to be less than 90 and the longitude values will need to be offset by 180. ie at lat 100, the latitude needs to be adjusted to 80 as we have gone past the pole by 10
        if (latitudeCirc[check]>90){
            latitudeCirc[check]=latitudeCirc[check]-90;// subtract 90 to find how many degrees past the pole north we are 
            latitudeCirc[check]=90-latitudeCirc[check]; // subtract the number of degrees past the pole from 90 to find our new postion  
            longitudeCirc[check]=longitudeCirc[check]+180; // offset by 180 as we are now on the opposite side of the pole
        }
        //when the latitude is over the south pole the latitude values will need to be adjusted to be more than -90 and longitude values need to be offset by 180. ie at lat -100, the latitude has gone past the pole by 10 degrees and needs to be adjusted to -80
        if (latitudeCirc[check]<-90){
            latitudeCirc[check]=latitudeCirc[check]+90;//add 90 to find how many degrees past the south pole we are (in this case we add as the latitude is negative)
            latitudeCirc[check]=-90-latitudeCirc[check]; // subtract the difference from -90, the south pole is at -90 and the difference will be a negative number, therefore by subtracting we are actually adding 
            longitudeCirc[check]=longitudeCirc[check]+180; // offsetting the longitude to end up on the opposite side of the pole 
        }
    }
    console.log('Longitude Circ: ');
    console.log(longitudeCirc);
    latitudeCirc.push(latitudeCirc[0]);
    console.log('Latitude Circ: ');
    console.log(latitudeCirc);
    longitudeCirc.push(longitudeCirc[0]);
        return [latitudeCirc, longitudeCirc]; // our output arguments will be in the form of two arrays, one fore each latitude value and one for each longitude value 
    }
>>>>>>> b8c79a9f382f28691a43bb189a83d7f3323c92e9

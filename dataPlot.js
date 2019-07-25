/**
 * dataPlot.js
 *
 *
 * Plots the input data on a map in the provided div container.
 * 
 * Author: Matthew Auld
 * Last Modified date: 12/07/2019
 * 
 * Requirements: plotly.js
 * Found here: https://plot.ly/javascript/getting-started/
 * 
 * Usage:
 * 
 * Include package in html using: <script src="dataPlot.js"></script>
 * 
 * Inputs:
 *        container - The container you want the plot to be shown in
 *        latitude  - The latitude array of what you wish to show
 *        longitude - The longitude array of what you wish to show
 *
 * Outputs:
 *        Plots the input data in a graph within the container you provided.
 * 
 * Aditional info:
 *        https://plot.ly/javascript/reference/#layout-mapbox
 * Above url provides access to the documentation behind how the map is generated and shown.
*/

function dataPlot(container, latitude, longitude, name, marker){
  // Generate a test sine wave to ensure that the map is working as intended
    var N = 1000;
    var shift = 0;
    var amp = 45;
    var cycles = 0.05/3;
    var initialVal = 0;
    var finalVal = 720;

    var result = Array.apply(null, {length: N}).map(Number.call, Number);
    var val = [];
    var idx = [];
    for (var i = 0; i <= 0 + N; i++) {
        idx.push(initialVal + finalVal * i / N);
        val.push(shift + amp * Math.sin(cycles * finalVal * i / N));
    }  
  
    Array.prototype.isArray = true;
    // Create the trace object
    if(latitude.isArray && longitude.isArray){
      var trace = {
        // If testing replace latitude with val and longitude with idx
          lat: latitude,        // Latitude
          lon: longitude,       // Longitude
          name: name,
          mode: marker,        // Mode of marking
          type: 'scattermapbox', // Type of map trace is going into
          connectgaps: true
      };
    }
    else{
      var trace = {
        // If testing replace latitude with val and longitude with idx
          lat: [latitude],        // Latitude
          lon: [longitude],       // Longitude
          name: name,
          mode: marker,        // Mode of marking
          type: 'scattermapbox', // Type of map trace is going into
          connectgaps: true
      };
    }
  // Create the layout object for the map
    layout = {
        mapbox: { 
          style: 'dark'
        }, 
        margin: {
          r: 0, 
          t: 0, 
          b: 0, 
          l: 0, 
          pad: 0
        }, 
        showlegend: false,
     };
  // Mapbox access token for getting the map.
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    })
  // function that actually generates the map.
    Plotly.plot(container, [trace], layout);
}



function initialiseMap(){
      
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
}   

function updateAndRedrawMap(){

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
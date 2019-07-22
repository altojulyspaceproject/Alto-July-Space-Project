/**
 * dataPlot.js
 *
 *
 * Plots the input data on a map in the provided div container.
 * 
 * Author: Matthew Auld
 * Last Modified date: 09/07/2019
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

function dataPlot(container,latitude, longitude){
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
    console.log(val);

    // latitude  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    // longitude = [1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,09,08,07,06,05,04,03,02,01];

  // Create the trace object
    var trace1 = {
      // If testing replace latitude with val and longitude with idx
        lat: latitude,        // Latitude
        lon: longitude,       // Longitude
        mode: 'lines',        // Mode of marking
        type: 'scattermapbox' // Type of map trace is going into
    };

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
     };
  // Mapbox access token for getting the map.
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    })
  // function that actually generates the map.
    Plotly.newPlot(container, [trace1], layout);
}
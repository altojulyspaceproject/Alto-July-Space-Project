
function dataPlot(TESTER){
    var N = 3000;
    var shift = 0;
    var amp = 60;
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

    var trace1 = {
        lat: val,
        lon: idx,
        mode: 'lines',
        name: 'linear',
        // line: {line: 'dot'},
        type: 'scattermapbox'
    };

    var trace2 = {
        x: idx,
        y: val,
        mode: 'lines',
        name: 'spline',
        line: {shape: 'spline'},
        type: 'scatter'
    };
    
    layout = {
        dragmode: 'zoom', 
        mapbox: {
          center: {
            lat: 38.03697222, 
            lon: -90.70916722
          }, 
          domain: {
            x: [0, 1], 
            y: [0, 1]
          }, 
          style: 'dark', 
          zoom: 3
        }, 
        margin: {
          r: 0, 
          t: 0, 
          b: 0, 
          l: 0, 
          pad: 0
        }, 
        showlegend: false
     };

    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
    })
    Plotly.newPlot( TESTER, [trace1], layout);
}
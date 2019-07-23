
  
  
  function buttonHandler(username , password, noradID) {

    //Fetch the TLE from Space-track  
    fetchTLEFromServer(noradID, username, password); //See tleToCoordinates.js
    //Need to promise on the TLEFromServer
    // .then(everything else)

    //Should be a set timeout that updates the localStorage every 3 seconds 
    setTimeout(function(){
      initialiseMap(); // plot function to initiate the map
    },3000);
    
    setInterval(function(){
     
      updateLocalStorageSatelliteData(); //Update current time to localStorage
      updateLocalStorageTimeData(); //Update Previous/Past Times to localStorage
      updateOnscreenValues(); //Change the Satellite and Groundstation Information

      setTimeout(function(){ 
        updateAndRedrawMap(); // updating the plot 
      },500);  

      correctGroundStationTracking(); //CHeck if the ground station is pointing in the right direction

    },3000);

  }


  function updateOnscreenValues(){

    var satEpoch = JSON.parse(window.localStorage.getItem('epoch'));
    var satName = JSON.parse(window.localStorage.getItem('satName'));
    var satAlt = JSON.parse(window.localStorage.getItem('altitude')).toFixed(2);
    var satLat = JSON.parse(window.localStorage.getItem('lat')).toFixed(4);
    var satLong = JSON.parse(window.localStorage.getItem('long')).toFixed(4);


    var gsLat = JSON.parse(window.localStorage.getItem('gsLat')).toFixed(4);
    var gsLong = JSON.parse(window.localStorage.getItem('gsLong')).toFixed(4);
    var gsAlt = JSON.parse(window.localStorage.getItem('gsAlt')).toFixed(2); 

    var gsAz = JSON.parse(window.localStorage.getItem('gsAziumth')).toFixed(4);
    var gsEl = JSON.parse(window.localStorage.getItem('gsElevation')).toFixed(4);
    
    var tracking = JSON.parse(window.localStorage.getItem('trackingAlgorithm'));
        
    //Update container
    document.getElementById('satTimeTle').innerHTML = "Time since TLE: " + satEpoch;
    document.getElementById('satName').innerHTML = "Satellite Name: " + satName;
    document.getElementById('satAltitude').innerHTML = "Satellite Altitude: " + satAlt;
    document.getElementById('satLatitude').innerHTML = "Satellite Latitude: " + satLat;
    document.getElementById('satLongitude').innerHTML = "Satellite Longitude: " + satLong;
    
    document.getElementById('gsLatitude').innerHTML = "Ground Station Latitude: " + gsLat;
    document.getElementById('gsLongitude').innerHTML = "Ground Station Longitude: " + gsLong;
    document.getElementById('gsAzimuth').innerHTML = "Ground Station Azimuth: " + gsAz;
    document.getElementById('gsElevation').innerHTML = "Ground Station Elevation: " + gsEl;
    document.getElementById("trackingAlgorithm").innerHTML = "Tracking Algorithm: " + tracking;

  }
  
  
  function buttonHandler(username , password, noradID) {

    //Fetch the TLE from Space-track  
    fetchTLEFromServer(noradID, username, password); //See tleToCoordinates.js
    //TODO: promise on the TLEFromServer
    // .then(everything else)

    //Should be a set timeout that updates the localStorage every 3 seconds 
    setTimeout(function(){
      initialiseMap(); // plot function to initiate the map
    },3000);
    
    setInterval(function(){
     
      updateLocalStorageSatelliteData(); //Update current satellite location to localStorage
      updateLocalStorageTimeData(); //Update Previous/Past Times to localStorage
      updateOnscreenValues(); //Change the Satellite and Groundstation Information
      startHamlib();


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

    var UTC = new Date();
        
    //Update container
    document.getElementById('satTimeTle').innerHTML =  satEpoch;
    document.getElementById('satName').innerHTML = satName;
    document.getElementById('satAltitude').innerHTML = satAlt;
    document.getElementById('satLatitude').innerHTML = satLat;
    document.getElementById('satLongitude').innerHTML = satLong;
    
    document.getElementById('gsLatitude').innerHTML = gsLat;
    document.getElementById('gsLongitude').innerHTML = gsLong;
    document.getElementById('gsAzimuth').innerHTML = gsAz;
    document.getElementById('gsElevation').innerHTML = gsEl;

    changeVisualColorTrackingAlgorithm(tracking);

    document.getElementById("gsUTC").innerHTML = UTC.toUTCString();
  }


  function changeVisualColorTrackingAlgorithm(tracking){
  
    var trackingElement = document.getElementById("trackingAlgorithm");

    trackingElement.innerHTML = tracking; //Set the value on screen
    if(tracking == "On Target"){
      trackingElement.style.color = '#66ff66'; //Lime Green
    }
    else if(tracking == "Off Target"){
      trackingElement.style.color = '#ff3333'; // red
    }
  }
  

  
  
  function buttonHandler(username , password, noradID) {

    //Fetch the TLE from Space-track  
    fetchTLEFromServer(noradID, username, password); //See tleToCoordinates.js

    //Need to promise on the TLEFromServer
    // .then(everything else)


    //Should be a set timeout that updates the localStorage every 3 seconds 
    setTimeout(function(){
      plotReal(); // plot function to initiate the map
    },3000);
    



    var antAz,antEl = 0;
    setInterval(function(){
     
      updateLocalStorageSatelliteData(); //Update current time to localStorage
      updateLocalStorageTimeData(); //Update Previous/Past Times to localStorage

      updateOnscreenValues();


      setTimeout(function(){ 
        plotReal1(); // updating the plot 
      },500);  

      
      var newAnt = compareAzEl(antAz,antEl);
      antAz = newAnt[0];
      antEl = newAnt[1];

      window.localStorage.setItem('antAz', JSON.stringify(antAz)); 
      window.localStorage.setItem('antEl', JSON.stringify(antEl)); 
     

    },3000);

  }


  function updateOnscreenValues(){

    var gsLat = JSON.parse(window.localStorage.getItem('gsLat')).toFixed(4);
    var gsLong = JSON.parse(window.localStorage.getItem('gsLong')).toFixed(4);
    var gsAlt = JSON.parse(window.localStorage.getItem('gsAlt')).toFixed(2); 

   
    var satAz = JSON.parse(window.localStorage.getItem('gsAziumth')).toFixed(4);
    var satEl = JSON.parse(window.localStorage.getItem('gsElevation')).toFixed(4);

    var antAz = JSON.parse(window.localStorage.getItem('antAz')).toFixed(4);
    var antEl = JSON.parse(window.localStorage.getItem('antEl')).toFixed(4);

    var satLat = JSON.parse(window.localStorage.getItem('lat')).toFixed(4);
    var satLong = JSON.parse(window.localStorage.getItem('long')).toFixed(4);
    var satAlt = JSON.parse(window.localStorage.getItem('altitude')).toFixed(2);
    var satName = JSON.parse(window.localStorage.getItem('satName'));
    var satEpoch = JSON.parse(window.localStorage.getItem('epoch'));



    //Update container
   

    document.getElementById('satLatitude').innerHTML = "Satellite Latitude: " + satLat;
    document.getElementById('satLongitude').innerHTML = "Satellite Longitude: " + satLong;
    document.getElementById('satAltitude').innerHTML = "Satellite Longitude: " + satAlt;
    document.getElementById('satName').innerHTML = "Satellite Name: " + satName;
    document.getElementById('satTimeTle').innerHTML = "Time since TLE: " + satEpoch;

    document.getElementById('gsLatitude').innerHTML = "Ground Station Latitude: " + gsLat;
    document.getElementById('gsLongitude').innerHTML = "Ground Station Longitude: " + gsLong;
    document.getElementById('gsAzimuth').innerHTML = "Ground Station Azimuth: " + satAz;
    document.getElementById('gsElevation').innerHTML = "Ground Station Elevation: " + satEl;


    





  }
  
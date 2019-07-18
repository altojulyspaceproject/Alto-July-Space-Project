
  
  
  function buttonHandler(username , password, noradID) {

    //Fetch the TLE from Space-track  
    fetchTLEFromServer(noradID, username, password); //See tleToCoordinates.js

    //Need to promise on the TLEFromServer
    // .then(everything else)


    //Should be a set timeout that updates the localStorage every 3 seconds 
    setTimeout(function(){
      plotReal(); // plot function to initiate the map
    },3000);
    
    setInterval(function(){
     
      updateLocalStorageSatelliteData(); //Update current time to localStorage
      updateLocalStorageTimeData(); //Update Previous/Past Times to localStorage

      updateOnscreenValues();


      setTimeout(function(){ 
        plotReal1(); // updating the plot 
      },500);  

      var newAnt = compareAzEl(0,0);
      antAz = newAnt[0];
      antEl = newAnt[1];

    },3000);

  }




  function updateOnscreenValues(){
  

    var gsLat = JSON.parse(window.localStorage.getItem('gsLat'));
    var gsLong = JSON.parse(window.localStorage.getItem('gsLong'));
    var gsAlt = JSON.parse(window.localStorage.getItem('gsAlt')); 

    var AntennaAz = JSON.parse(window.localStorage.getItem('gsAziumth'));
    var AntennaEl = JSON.parse(window.localStorage.getItem('gsElevation'));

    var satLat = JSON.parse(window.localStorage.getItem('lat'));
    var satLong = JSON.parse(window.localStorage.getItem('long'));
    var satAlt = JSON.parse(window.localStorage.getItem('altitude'));

    //Update Inputs
    document.getElementById('GSLatitude').value = gsLat;
    document.getElementById('GSLongitude').value = gsLong;
    document.getElementById('GSAltitude').value = gsAlt;
    document.getElementById('AntAz').value = AntennaAz;
    document.getElementById('AntEl').value = AntennaEl;
    document.getElementById('AntAlt').value = gsAlt;

    //Update Text Display
    document.getElementById('dataLatitude').value = satLat;
    document.getElementById('dataLongitude').value = satLong;
    document.getElementById('dataAltitude').value = satAlt;
    // document.getElementById('dataTime').value = '1234';
    document.getElementById('dataAzimuth').value = AntennaAz;
    document.getElementById('dataElevation').value = AntennaEl;





  }
  
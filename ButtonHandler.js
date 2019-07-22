
  
  
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
  

    var gsLat = JSON.parse(window.localStorage.getItem('gsLat'));
    var gsLong = JSON.parse(window.localStorage.getItem('gsLong'));
    var gsAlt = JSON.parse(window.localStorage.getItem('gsAlt')); 

    var satAz = JSON.parse(window.localStorage.getItem('gsAziumth'));
    var satEl = JSON.parse(window.localStorage.getItem('gsElevation'));

    var antAz = JSON.parse(window.localStorage.getItem('antAz'));
    var antEl = JSON.parse(window.localStorage.getItem('antEl'));

    var satLat = JSON.parse(window.localStorage.getItem('lat'));
    var satLong = JSON.parse(window.localStorage.getItem('long'));
    var satAlt = JSON.parse(window.localStorage.getItem('altitude'));



    //Update Inputs
    document.getElementById('GSLatitude').value = gsLat;
    document.getElementById('GSLongitude').value = gsLong;
    document.getElementById('GSAltitude').value = gsAlt;
    document.getElementById('AntAz').value = satAz;
    document.getElementById('AntEl').value = satEl;
    document.getElementById('AntAlt').value = gsAlt;

    //Update Text Display
    document.getElementById('dataLatitude').value = satLat;
    document.getElementById('dataLongitude').value = satLong;
    document.getElementById('dataAltitude').value = satAlt;
    // document.getElementById('dataTime').value = '1234';
    document.getElementById('dataAzimuth').value = antAz;
    document.getElementById('dataElevation').value = antEl;





  }
  
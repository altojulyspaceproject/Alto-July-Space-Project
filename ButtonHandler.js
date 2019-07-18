
  
  
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

      setTimeout(function(){ 
        plotReal1(); // updating the plot 
      },500);  

      var newAnt = compareAzEl(AntAz,AntEl);
		antAz = newAnt[0];
		antEl = newAnt[1];

    },3000);

    
  
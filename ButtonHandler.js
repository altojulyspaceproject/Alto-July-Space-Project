


  function ButtonHandler(username , password, noradID, groundLatitude, groundLongitude) {



    var refreshCounter=0;

    //Fetch the TLE from Space-track  
    fetchTLEFromServer(noradID, username, password); //See tleToCoordinates.js

    //Need to promise on the TLEFromServer
    // .then(everything else)


    //Should be a set timeout that updates the localStorage every 3 seconds 
    
    setInterval(function(){
     
      updateLocalStorageSatelliteData(); //Update current time
      updateLocalStorageTimeData(); //Update Previous/Past Times
      update(longLat); // updates the google map
      
      setTimeout(function(){ 
        plotReal1(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // updating the plot 
      },500);  

    },3000);

    
    setTimeout(function(){
      plotReal(latlongHolder[0],latlongHolder[1],latlongHolder[2],latlongHolder[3]); // plot function to initiate the map
    },3000);

  
  }
console.log(latlongHolder );

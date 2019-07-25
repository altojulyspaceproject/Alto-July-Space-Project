






function correctGroundStationTracking(){
   
  var acceptableRange = 0.2;

  var satAz = JSON.parse(window.localStorage.getItem('gsAziumth'));
  var satEl = JSON.parse(window.localStorage.getItem('gsElevation'));

  var antAz = JSON.parse(window.localStorage.getItem('antAz'));
  var antEl = JSON.parse(window.localStorage.getItem('antEl'));


  //Calculate the difference between the current and actual targets
  var azDif = satAz - antAz;  
  var elDif = satEl - antEl; 

  //Check if within acceptable ranges
  if ((azDif <  acceptableRange) && 
      (azDif > -acceptableRange) && 
      (elDif <  acceptableRange) && 
      (elDif > -acceptableRange))  {
        window.localStorage.setItem('trackingAlgorithm',JSON.stringify("On Target"));   
  }
  //Otherwise set the algorithm to the current location
  else {
    window.localStorage.setItem('trackingAlgorithm',JSON.stringify("Off Target"));
    antAz = satAz;
    antEl = satEl;
  }

  window.localStorage.setItem('antAz', JSON.stringify(antAz)); 
  window.localStorage.setItem('antEl', JSON.stringify(antEl)); 

  return [antAz,antEl];
}


function startHamlib(){

  $.ajax({
                
    url: '/hamlib',
    type: 'POST',
    success: function(output) {
      console.log("Called Hamlib");
    }

  });



}







function compareAzEl(antAz,antEl){
   
  var acceptableRange = 0.10;

  var satAz = JSON.parse(window.localStorage.getItem('gsAziumth'));
  var satEl = JSON.parse(window.localStorage.getItem('gsElevation'));


  var azDif = satAz - antAz;
  var elDif = satEl - antEl; 

  console.log(azDif);
  console.log(elDif);
  console.log(satAz);
  console.log(satEl);

  if (  (azDif < acceptableRange)  && 
        (azDif > -acceptableRange) && 
        (elDif < acceptableRange)  && 
        (elDif>-acceptableRange))  {
           document.getElementById("trackingAlgorithm").innerHTML = "On Target";
  }
  else{
      document.getElementById("trackingAlgorithm").innerHTML = "Off Target";
      antAz = satAz;
      antEl = satEl;
  }
  return [antAz,antEl];
}
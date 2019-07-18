function compareAzEl(antAz,antEl){
   
   var acceptableRange = 0.05;
   var azDif = azimuth1-antAz;
   var elDif = elevation1 - antEl; 
console.log(azimuth1)

    if (azDif < acceptableRange && azDif>-acceptableRange && elDif <acceptableRange && elDif>-acceptableRange){
        document.getElementById("dataTime").value = "On Target";
        

    }
    else{
        document.getElementById("dataTime").value="Off Target";
        antAz = azimuth1;
        antEl=elevation1;
        document.getElementById("dataAzimuth").value = AntAz;
        document.getElementById("dataElevation").value = AntEl;
    }
return [antAz,antEl];
}
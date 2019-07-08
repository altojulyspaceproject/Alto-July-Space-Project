//global val to be updated by satellite.js output
var satLoc = {lat: -10.97, lng: -1.28};

var marker = new google.maps.Marker({});

function update(satLocation) {
	satLoc = satLocation;
  console.log(satLoc);
	console.log(satLocation);
  marker.setPosition(satLoc);
}
//initialises the map
function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 1,
  center: satLoc,
   mapTypeId:'satellite',
   mapTypeControl: true,
   mapTypeControlOptions: {
     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
     mapTypeIds: ['hybrid','satellite', 'terrain']
   },
   streetViewControl: false
 });

  var icon = './webMap/res/ship.png';
  marker = new google.maps.Marker({
    position:satLoc,
    map:map,
    icon:icon
  });

    

    // drawLatLng( satLoc,marker, map);
 } //end initMap

// window.setInterval(function(){

//   console.log(window.satLoc);
// }, 1000);

//function to draw Marker which refreshes every 1000ms
// function drawLatLng(satLoc,marker,map){

   
// } //end drawLatLng

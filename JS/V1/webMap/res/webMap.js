//global val to be updated by satellite.js output
let satLoc = {lat: -10.97, lng: -1.28};

function update(satLocation) {
	satLoc = satLocation;
	console.log(satLoc);
}
//initialises the map
function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 2,
  center: satLoc,
   mapTypeId:'satellite',
   mapTypeControl: true,
   mapTypeControlOptions: {
     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
     mapTypeIds: ['hybrid','satellite', 'terrain']
   },
   streetViewControl: false
 });

var ship = './webMap/res/ship.png';
drawLatLng(satLoc, ship, map);
 } //end initMap

//function to draw Marker which refreshes every 1000ms
function drawLatLng(satLoc,icon,map){
    window.setInterval(function() {
      // satLoc['lat'] = satLoc['lat']+1;

      var marker = new google.maps.Marker(
       {
         position: satLoc,
         map: map,
         icon:icon,
       });
  }, 1000);
} //end drawLatLng

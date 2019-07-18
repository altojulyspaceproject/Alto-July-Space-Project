  //global val to be updated by satellite.js output
  let satLoc = {lat: -10.97, lng: -1.28};

  function update(satLocation) {
    // satLoc = satLocation;
    satLoc["lat"] = satLocation["lat"];
    satLoc["lng"] = satLocation["long"];

    // lat = 
    // long = 

  }
  marker = new google.maps.Marker(
    {
      position: satLoc,
      map: map,
      icon:ship,
    });

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
  marker = new google.maps.Marker(
    {
      position: satLoc,
      map: map,
      icon:ship,
    });

  window.setInterval(function() {
    // satLoc['lat'] = satLoc['lat']+1;

    var lat = window.localStorage.getItem('lat');
    var long = window.localStorage.getItem('long');

    var latlng = new google.maps.LatLng(lat, long);
    marker.setPosition(latlng);
    
  }, 1000);


  } //end initMap



  
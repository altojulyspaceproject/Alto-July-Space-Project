function footprintRadius(latitude, altitude){
    //  Fixed variables
    var rEquitorial = 6356; // Radius of Earth at equator
    var rPolar = 6356.8;    // Radius of Earth at Pole
    //  Usable Earth Radius
    var rEarth = rEquitorial * rPolar / Math.sqrt( Math.pow(rPolar,  2) * Math.pow(Math.cos(latitude), 2) + Math.pow(rEquitorial,2) * Math.pow(Math.sin(latitude), 2) );
    
    var thetaA = Math.asin(rEarth / (altitude + rEarth));

    var distHoriz = rEarth / Math.tan(thetaA);

    var lengthRight = distHoriz * Math.sin(thetaA);

    var theta = Math.asin(lengthRight / rEarth);

    var radius = rEarth * (theta - 5* Math.PI / 180);

    return radius;
}
//Title: trackerCalcs
//Author: Adrian +Steph(rewrote in JS )
// Inputs: 
    //position of satellite, position of ground station, antenna orientation
//Outputs: 
    // continually update antenna orientation to point towards satellite

//all coordinates are in azimuth, altitude and distance from centre of antenna. 
// convert all degrees to radians and all kilometres to metres 


//groundStation = [Lat(deg),Long(deg),altitude(km)]
//satellitePos = [lat(deg),long(deg),altitude(km)]
//antennaOrientation = [azimuth(deg),elevation(deg),antenna height (m)]

function trackerCalcs(groundStation, satellitePos,antennaOrientation){
    console.log([groundStation, satellitePos, antennaOrientation])
    // Defining all of the inputs and converting to the correct units 

    //Ground Station coords 
    var groundStationLat = groundStation[0]*Math.PI/180; 
    var groundStationLong=groundStation[1]*Math.PI/180;
    var groundStationHeight = groundStation[2]*1000;
    
    //Satellite coords
    var satelliteLat = satellitePos[0] *Math.PI/180;
    var satelliteLong = satellitePos[1]*Math.PI/180;
    var satelliteHeight= satellitePos[2]*1000;

    // Antenna Coords 
    var antennaAzimuth = antennaOrientation[0]*Math.PI/180;
    var antennaAltitude=antennaOrientation[1]*Math.PI/180;
    var antennaSize = antennaOrientation[2];

    // Defining the nominal earth equatorial radius as a constant in metres 
    var rEarthEq = 6378100;

    //calculate the distance to the satellite and ground station from earth centre
    var centre_to_sat = rEarthEq +satelliteHeight; // the distance to the satelite from the centre of the earth 
    var centre_to_ground = rEarthEq + groundStationHeight; //distance from ground station to centre of the earth 

    // define the difference between satellite/ground station longitude and latitude
    var delta_lat = satelliteLat-groundStationLat; //difference in latitude
    var delta_long = satelliteLong-groundStationLong; // difference in longitude

    // calculate the satellite azimuth 
            //north = 0 deg 
            //east = 90 deg
            //south = 180 deg
            //west = 270 deg
    var X = Math.cos(groundStationLat)*Math.sin(delta_long);
    var Y = Math.cos(satelliteLat)*Math.sin(groundStationLat)-Math.sin(satelliteLat)*Math.cos(groundStationLat)*Math.cos(delta_long);
    var satelliteAzimuth = Math.abs(Math.atan(X/Y));
    console.log(satelliteAzimuth)
    if (delta_long > 0 && delta_lat<0){
        satelliteAzimuth = satelliteAzimuth+Math.PI/2;
    }
    else if(delta_lat < 0 && delta_long<0){
        satelliteAzimuth = satelliteAzimuth+Math.PI;
    }
    else if(delta_lat > 0 && delta_long <0){
        satelliteAzimuth=satelliteAzimuth+3*Math.PI/2;
    }

    //calculate the distance to the satellite from the ground station
    //calculations are separated into three variables for simplicity

    var radial_squares = Math.pow(centre_to_sat,2)+Math.pow(centre_to_ground,2);
    var radial_double = 2*centre_to_sat*centre_to_ground;
    var angular_combo = Math.sin(satelliteLat)*Math.sin(groundStationLat)*Math.cos(groundStationLong-satelliteLong)+Math.cos(groundStationLat)*Math.cos(satelliteLat);

    //ground_to_sat is the distance to the satellite from the ground station which is calculated from the above three variables.
    var ground_to_sat = Math.sqrt(radial_squares-radial_double*angular_combo);

    //calculate elevation (using law of cosines) with earth radius and earth radius plus altitude
    var satelliteAltitude = Math.acos(  (Math.pow(rEarthEq,2) + Math.pow(ground_to_sat,2) - Math.pow(centre_to_sat,2) ) / (2 * rEarthEq * ground_to_sat) ) - Math.PI  / 2;
console.log([satelliteAltitude,ground_to_sat,centre_to_sat,rEarthEq])
    //convert coordinates into cartesian

    //create the vector for satellite position from aximuth, altitude, distance to satellite
    var satellitePos = sphere_to_cart(satelliteAzimuth,satelliteAltitude,ground_to_sat);
console.log(satellitePos+"satellite")
    // create antenna direction vector that is parallel to the receiving surface, initalised at correct position, 90 degrees (orthogonal) to the object direction
    var antennaPos = sphere_to_cart(antennaAzimuth,antennaAltitude,antennaSize);
console.log(antennaPos+"antenna")
    //take the dot product of the satellite position and antenna orientation, desired result is a zero scalar which means the antenna is aligned with the satellite
    var diff_factor = satellitePos[0]*antennaPos[0]+satellitePos[1]*antennaPos[1]+satellitePos[2]*antennaPos[2];
console.log(diff_factor)
    if (diff_factor > Math.pow(10,-5) || diff_factor < Math.pow(-10,-5)){
        var accurate = false;
        console.log("set alt/az to satelliteAltitude*180/PI, satelitteAzimuth*180/PI")
    }
    else{
        var accurate = true;
        console.log("accurate")
    }
return [accurate,satelliteAzimuth,satelliteAltitude];
}




//This is a function to convert spherical coordinates to cartesion 
function sphere_to_cart(azimuth,altitude,radius){
        inc=Math.PI/2-altitude;
        x =radius*Math.sin(inc)*Math.cos(azimuth);
        y=radius*Math.sin(inc)*Math.sin(azimuth);
        z=radius*Math.cos(inc);
        return [x,y,z];
    }
//this is a function to convert cartesian coordinates to spherical. 
function cart_to_sphere(x,y,z){
    radius = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
    inc = Math.acos(z/r);
    azimuth = Math.atan(y/x);
    altitude = Math.PI/2-inc;
    return [azimuth,altitude,radius];
}

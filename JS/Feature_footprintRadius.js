/**
 * Feature_footprintRadius.js
 *
 *
 * Calculates the radius of the visible Earth footprint for a space object.
 * 
 * Author: Matthew Auld + Stephanie Batten
 * Last Modified date: 11/07/2019
 * 
 * Requirements: None
 * 
 * Usage: Used to calculate the distance that defines the radius of the visible Earth footprint for a space object (satellite).
 * 
 * Include package in html using: <script src="Feature_footprintRadius.js"></script>
 * 
 * Inputs:
 *        latitude - The latitude of the object.
 *        altitude - The altitude of the object. In metric units of your choice. 
 *
 * Outputs:
 *        Outputs a number, in units the same as the input altitude, which defines the radius of the visible footprint.
*/

function footprintRadius(latitude, altitude){
    //  Fixed variables
    var rEquitorial = 6356; // Radius of Earth at equator
    var rPolar = 6356.8;    // Radius of Earth at Pole
    //  Usable Earth radius taking into account the oblateness of the Earth.
    var latitude2 = latitude * Math.PI / 180;
    var rEarth = rEquitorial * rPolar / Math.sqrt( Math.pow(rPolar,  2) * Math.pow(Math.cos(latitude2), 2) + Math.pow(rEquitorial,2) * Math.pow(Math.sin(latitude2), 2) );
    //  Angle of the right angle triangle that connects the centre of the Earth to the object and to the tangential line of the object to the Earth.
    var thetaA = Math.asin(rEarth / (altitude + rEarth));
    //  Distance from the object to the horizon along a tangential line using the angle of the right angle triangle with hypontenuse along the same line (thetaA).
    var distHoriz = rEarth / Math.tan(thetaA);
    //  Perpendicular distance from the line that connects the object to the center of the EArth (polar axis) to the point on the horizon tangential to the Earth.
    var lengthRight = distHoriz * Math.sin(thetaA);
    //  Angle between the polar axis and the radius of the Earth connecting to the point on the horizon.
    var theta = Math.asin(lengthRight / rEarth);
    //  The distance that defines the radius of the footprint of the object.
    var radius = rEarth * (theta);// - 5 * Math.PI / 180); // In the same units as altitude input.

    return radius;
}
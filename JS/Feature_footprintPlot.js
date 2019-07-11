function footprintPlot(latitude, longitude, radius) {
//creating an array of angles from 0-2pi with a steo size of pi/50 to define the distance between points around the circl 
var N = 2 * Math.PI / (Math.PI / 50);
var initialVal = 0;
var finalVal = 2*Math.PI;
var angleCirc = [];
    for (var i = 0; i <= 0 + N; i++) {
        angleCirc.push(initialVal + finalVal * i / N);
    } 
    console.log('In plot func');
// defining the distance from the centre of the circle to each point on the circle in the horizontal direction using the relation cos(angle)  = a/h where a is the vertical distance, h is the radius of the footprint
var xunit = angleCirc.map(x => radius * Math.sin(x));
console.log('xUnit(km):');
console.log(xunit);
// defining the distance from the centre of the circle to each point on the circle in the vertical direction using the relation sin(angle)  = o/h where o is the horizontal distance, h is the radius of the footprint
var yunit = angleCirc.map(x => radius * Math.cos(x));
console.log('yUnit(km):');
console.log(yunit);
// converting the xunit value from a km value to a value in degrees and then adding the latitude position of the satellite, to determine the latitude position of points on the circle
var latitudeCirc = xunit.map( x => x * 180 / 6372 / Math.PI + latitude);
console.log('latitudeCirc(deg):');
console.log(latitudeCirc);
// converting the yunit value from a km value to a value in degrees and then adding the longitude position of the satellite, to determine the longitude position of points on the circle 
var distance = new Array(xunit.length);
for (var i = 0; i <= xunit.length; i++){
    distance[i] = yunit[i] / Math.PI * 180 / 6372 / Math.cos(latitudeCirc[i] * Math.PI / 180);
}
console.log('distance:');
console.log(distance);
var conversionFactor = Math.cos(latitudeCirc * Math.PI / 180) * 111.32;
// var distance = yunit.map(x => x/Math.PI * 180 /6372 / xunit.map(y => Math.cos(y)));
var longitudeCirc = distance.map( x => x + longitude);
console.log('longitudeCirc(deg):');
console.log(longitudeCirc);
// adjusting the latitude and longitude values for when the satellite foot print is over a pole, this is necessary because latitude values must fall between -90 and 90 and when passing the poles values increase past 90 ie at 100 degrees we are actually at a latitude of 80 as we have gone past the pole by 10 degrees or in other words we have moved down 10 degrees from the top.  
for (var check=0; check <= 0 + N; check++) {
    //when the latitude is over the north pole the latitude values will need to be adjusted to be less than 90 and the longitude values will need to be offset by 180. ie at lat 100, the latitude needs to be adjusted to 80 as we have gone past the pole by 10
    if (latitudeCirc[check]>90){
        latitudeCirc[check]=latitudeCirc[check]-90;// subtract 90 to find how many degrees past the pole north we are 
        latitudeCirc[check]=90-latitudeCirc[check]; // subtract the number of degrees past the pole from 90 to find our new postion  
        longitudeCirc[check]=longitudeCirc[check]+180; // offset by 180 as we are now on the opposite side of the pole
    }
    //when the latitude is over the south pole the latitude values will need to be adjusted to be more than -90 and longitude values need to be offset by 180. ie at lat -100, the latitude has gone past the pole by 10 degrees and needs to be adjusted to -80
    if (latitudeCirc[check]<-90){
        latitudeCirc[check]=latitudeCirc[check]+90;//add 90 to find how many degrees past the south pole we are (in this case we add as the latitude is negative)
        latitudeCirc[check]=-90-latitudeCirc[check]; // subtract the difference from -90, the south pole is at -90 and the difference will be a negative number, therefore by subtracting we are actually adding 
        longitudeCirc[check]=longitudeCirc[check]+180; // offsetting the longitude to end up on the opposite side of the pole 
    }
}
console.log('Latitude Circ: ');
console.log(latitudeCirc[0]);
latitudeCirc.push(latitudeCirc[0]);
console.log('Latitude Circ: ');
console.log(latitudeCirc);
longitudeCirc.push(longitudeCirc[5]);
    return [latitudeCirc, longitudeCirc]; // our output arguments will be in the form of two arrays, one fore each latitude value and one for each longitude value 
}
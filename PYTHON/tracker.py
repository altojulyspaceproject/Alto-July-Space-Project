#this code will take the position of a satellite, ground station and antenna orientation and continually
#update antenna orientation to point towards the satellite

import numpy as np
from scipy import constants as cn
from astropy import constants as acn
from astropy import units as u

#define functions that transform from spherical polar coordinates (azimuth, altutude, radial)
#to cartesian coordinates (x, y, z) and back

#spherical to cartesian function
def sphere_to_cart(az, alt, r):
	inc = np.pi/2 - alt
	x = r*np.sin(inc)*np.cos(az)
	y = r*np.sin(inc)*np.sin(az)
	z = r*np.cos(inc)
	return(x, y, z)

#cartesian to spherical function
def cart_to_sphere(x, y, z):
	r = np.sqrt((x**2)+(y**2)+(z**2))
	inc = np.arccos(z/r)
	az = np.arctan(y/x)
	alt = np.pi/2 -inc
	return(az, alt, r)

#all coordinates will be in azimuth, altitude and distance from centre of antenna

#convert all degrees to radians and all kilometres to metres

#testing code - ask the user for ground station position, convert to radians and to metres
#will only need to ask for this once
print('Enter ground station coordinates in Latitude/longitude (in degrees)')
ground_lat_coordinate = input('latitude coordinate:')*cn.pi/180
ground_long_coordinate = input('longitude coordinate:')*cn.pi/180
ground_height = input('enter the ground station height above sea level (in kilometres)')*1000

#testing code - ask the user for satellite position, convert to radians and to metres
#will need constant requests for this
print('Enter satellite coordinates in Latitude/longitude (in degrees)')
sat_lat_coordinate = input('latitude coordinate:')*cn.pi/180
sat_long_coordinate = input('longitude coordinate:')*cn.pi/180
sat_height = input('enter the satellites height above sea level (in kilometres):')*1000

#testing code - antenna position, three coordinates (degrees, degrees, metres)
#will only need to ask for this once
#possible to take constant requests if orientation is unreliable or antenna moves on its own
print('Enter antenna orientation in altitude/azimuth (degrees) and antenna radius (metres)')
ant_azimuth = input('azimuth:')*cn.pi/180
ant_altitude = input('altitude:')*cn.pi/180
ant_size = input('size:')

#calculate distance to satellite and ground station from eath centre
centre_to_sat = acn.R_earth.value + sat_height
centre_to_ground = acn.R_earth.value + ground_height

#define difference between satellite/ground station longitude and lattitude
delta_lat = sat_lat_coordinate - ground_lat_coordinate
delta_long = sat_long_coordinate - ground_long_coordinate

#calculate satellite azimuth, with 0 degrees: north, 90 degrees: east, 180 degrees: south, 270 degrees: west
sat_azimuth = np.abs(np.arctan(delta_long/delta_lat))
if (delta_long > 0 and delta_lat < 0):
	sat_azimuth = sat_azimuth+np.pi/2
elif (delta_lat < 0 and delta_long < 0):
	sat_azimuth = sat_azimuth+np.pi
elif (delta_lat > 0 and delta_long < 0):
	sat_azimuth = sat_azimuth +3*np.pi/2

#calculate distance to satellite from ground station, divided up into three parts to be (almost) comprehensible
radial_squares = (centre_to_sat**2)+(centre_to_ground**2)
radial_double = 2*centre_to_sat*centre_to_ground
angular_combo = np.sin(sat_lat_coordinate)*np.sin(ground_lat_coordinate)*np.cos(ground_long_coordinate-sat_long_coordinate)+np.cos(ground_lat_coordinate)*np.cos(sat_lat_coordinate)
#dround_to_sat is the final variable that takes in the three previous variables and spits out the distance
ground_to_sat = np.sqrt(radial_squares-radial_double*angular_combo)

#calculate elevation (using law of cosines) with earth radius and earth radius plus altitude
sat_altitude = np.arccos(((acn.R_earth.value**2)+(ground_to_sat**2)-(centre_to_sat**2))/(2*acn.R_earth.value*ground_to_sat)) - np.pi/2

#convert coordinates into cartesian

#create the vector for satellite position from azimuth, altitude, distance to satellite
sat_pos = sphere_to_cart(sat_azimuth, sat_altitude, ground_to_sat)

#create antenna direction vector that is parallel to the receiving surface, initialised at correct
#position, 90 degrees (orthogonal) to the object direction
ant_pos = sphere_to_cart(ant_azimuth, ant_altitude, ant_size)

#take the dot product of the satellite position and antenna orientation. The desired result is a zero scalar, which means the antenna is aligned
#with the satellite
diff_factor = np.dot(sat_pos, ant_pos)

if (diff_factor > 10**-5 or diff_factor < -10**-5):
	print('set alt/az to',sat_altitude*180/np.pi, sat_azimuth*180/np.pi)
else:
	print('accurate')

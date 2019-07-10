import numpy as np
from scipy import constants as cn

#testing code - ask the user for ground station position, convert to radians
print('Enter ground station coordinates in Latitude/longitude (in degrees)')
ground_lat_coordinate = input('latitude coordinate:')*cn.pi/180
ground_long_coordinate = input('longitude coordinate:')*cn.pi/180

#testing code - ask the user for satellite position, convert to radians
print('Enter satellite coordinates in Latitude/longitude (in degrees)')
ground_lat_coordinate = input('latitude coordinate:')*cn.pi/180
ground_long_coordinate = input('longitude coordinate:')*cn.pi/180

#create the vector for object position
object_pos = (x_coordinate, y_coordinate, z_coordinate)
print(object_pos)

#create antenna direction vector that is parallel to the receiving surface, initialised at correct  
#position, 90 degrees (orthogonal) to the object direction
antenna_pos = (ground_lat_coordinate)

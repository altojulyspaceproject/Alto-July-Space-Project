import numpy as np
from scipy import constants as cn

#testing code - ask the user for object position (ECEF)
print('Enter coordinates in ECEF (in kilometres)')
x_coordinate = input('x coordinate:')
y_coordinate = input('y coordinate:')
z_coordinate = input('z coordinate:')

#create the vector for object position
object_pos = (x_coordinate, y_coordinate, z_coordinate)
print(object_pos)

print(cn.pi)

#create antenna direction vector that is parallel to the receiving surface, initialised at correct  
#position, 90 degrees (orthogonal) to the object direction
antenna_pos = 0

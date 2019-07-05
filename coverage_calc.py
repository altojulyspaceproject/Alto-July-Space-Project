import numpy as np

#coverage calculation:
#assume the earth is a sphere (approximation)
#AltitudeFromCentre is distance from object being tracked to centre of earth
#unitary. Just add constants and stir for coverage satisfaction
val=input('enter altitude in earth radii (note, earth radius here is normalised)')
Altitude=float(val)
EarthRadius=1
AltitudeFromCentre=Altitude+EarthRadius

#theta: angle between vector:centre to object and vector: object to coverage limit
thetaA=np.arcsin(EarthRadius/AltitudeFromCentre)

#DistToLimit: distance to coverage limit from the object (symmetrical through theta in spherical approximation)
DistToLimit=EarthRadius/np.tan(theta)

#PolarAxisToSurface: distance between z axis and a point lying on the coverage limit
PolarAxisToSurface=DistToLimit*np.sin(theta)

#DistToAltitude: distance from the origin of PolarAxisToSurface and the object
DistToAltitude=np.sqrt((PolarAxisToSurface**2)+(DistToLimit**2))

#coverage: the coverage radius that defines the area of coverage (line of sight)
coverage= 2*np.pi()*theta/360

print('distance to ')
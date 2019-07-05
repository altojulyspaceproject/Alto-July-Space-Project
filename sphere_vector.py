from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
from itertools import product, combinations


fig = plt.figure()
ax = fig.gca(projection='3d')
ax.set_aspect("equal")

# draw cube encapsulating relevant field
r = [-2, 2]
for s, e in combinations(np.array(list(product(r, r, r))), 2):
    if np.sum(np.abs(s-e)) == r[1]-r[0]:
        ax.plot3D(*zip(s, e), color="b")

# draw sphere (earth approximation)
u, v = np.mgrid[0:2*np.pi:20j, 0:np.pi:10j]
x = np.cos(u)*np.sin(v)
y = np.sin(u)*np.sin(v)
z = np.cos(v)
ax.plot_wireframe(x, y, z, color="r")

# draw a point
ax.scatter([0], [0], [0], color="g", s=100)

# draw a vector
from matplotlib.patches import FancyArrowPatch
from mpl_toolkits.mplot3d import proj3d


class Arrow3D(FancyArrowPatch):

    def __init__(self, xs, ys, zs, *args, **kwargs):
        FancyArrowPatch.__init__(self, (0, 0), (0, 0), *args, **kwargs)
        self._verts3d = xs, ys, zs

    def draw(self, renderer):
        xs3d, ys3d, zs3d = self._verts3d
        xs, ys, zs = proj3d.proj_transform(xs3d, ys3d, zs3d, renderer.M)
        self.set_positions((xs[0], ys[0]), (xs[1], ys[1]))
        FancyArrowPatch.draw(self, renderer)

#coverage calculation:
#assume the earth is a sphere (approximation)
#AltitudeFromCentre is distance from object being tracked to centre of earth
#unitary. Just add constants and stir for coverage satisfaction
val=input('enter altitude in earth radii (note, earth radius here is normalised)')
Altitude=float(val)
EarthRadius=1
AltitudeFromCentre=Altitude+EarthRadius

#theta: angle between vector:centre to object and vector: object to coverage limit
theta=np.arcsin(EarthRadius/AltitudeFromCentre)

#DistToLimit: distance to coverage limit from the object (symmetrical through theta in spherical approximation)
DistToLimit=EarthRadius/np.tan(theta)

#PolarAxisToSurface: distance between z axis and a point lying on the coverage limit
PolarAxisToSurface=DistToLimit*np.sin(theta)

#DistToAltitude: distance from the origin of PolarAxisToSurface and the object
DistToAltitude=np.sqrt((PolarAxisToSurface**2)+(DistToLimit**2))

#vectors:
#vector a points to object, takes altitude on z axis earth. Can rotate earth (or rotate map on the wire frame) and change altitude to move object position
#vector b, c, d, e points to a point on sphere on +-x and y axis at furthest field of view. Now just need to draw a circle around these points
a = Arrow3D([0, 0], [0, 0], [0, AltitudeFromCentre], mutation_scale=20,
            lw=1, arrowstyle="-|>", color="k")

b = Arrow3D([0, 0], [0, PolarAxisToSurface], [AltitudeFromCentre, DistToAltitude], mutation_scale=20,
            lw=1, arrowstyle="-|>", color="m")
c = Arrow3D([0, 0], [0, -PolarAxisToSurface], [AltitudeFromCentre, DistToAltitude], mutation_scale=20,
            lw=1, arrowstyle="-|>", color="m")
d = Arrow3D([0, PolarAxisToSurface], [0, 0], [AltitudeFromCentre, DistToAltitude], mutation_scale=20,
            lw=1, arrowstyle="-|>", color="m")
e = Arrow3D([0, -PolarAxisToSurface], [0, 0], [AltitudeFromCentre, DistToAltitude], mutation_scale=20,
            lw=1, arrowstyle="-|>", color="m")
ax.add_artist(a)
ax.add_artist(b)
ax.add_artist(c)
ax.add_artist(d)
ax.add_artist(e)
plt.show()

function [X,Y,Z] = teme2ecef(X,Y,Z,Epoch,T)

Deg2Rad = pi/180;
Rad2Deg = 180/pi;
Now = Epoch + T;
%Obtain the Greenwich Mean Sidereal Time at 00h of current day
GMST = THETAG(Now);
%Apply nutation effects
JulNow = juliandate(Now);
CenSince = (JulNow-2443144.5)/36525;
Omega = 125.04452222+...
        (-6962890.5390*CenSince+7.455*CenSince^2+0.008*CenSince^3)/3600;
Omega = rem(Omega,360)*Deg2Rad;
GMST  = GMST+...
        0.00264*pi/(3600*180)*sin(Omega)+...
        0.000063*pi/(3600*180)*sin(2*Omega);
%Puts coords into a 3x1 matrix
PosMat = [X;Y;Z];
%Creates the 3x3 transformation matrix
TransMat(1,1) =  cos(GMST);
TransMat(1,2) = -sin(GMST);
TransMat(1,3) =  0;
TransMat(2,1) =  sin(GMST);
TransMat(2,2) =  cos(GMST);
TransMat(2,3) =  0;
TransMat(3,1) =  0;
TransMat(3,2) =  0;
TransMat(3,3) =  1;
%Transform the position matrix using the transformation matrix to get the
%transformed matrix. (Confusing, I know.)
Transformed = TransMat'*PosMat;
X = Transformed(1);
Y = Transformed(2);
Z = Transformed(3);
end
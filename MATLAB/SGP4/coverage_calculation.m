%% coverage calculation takes the latitude and altitude of the satellite and calculates coverage in km
% author: Steph and Adrian 
%% inputs: latidude and altitude 
%% outputs the angle between the altitude and the furthest point on the ground and the coverage distance in meters 

function [theta,coverageRad]=coverage_calculation(latitude,altitude)
for f=1:1:length(altitude)
    rEquitorial = 6356; % equitorial radius of earth 
    rPolar = 6356.8; % polar radius of earth
rEarth = rEquitorial*rPolar/sqrt(rPolar^2*(cosd(latitude(f))^2)+rEquitorial^2*(sind(latitude(f))^2)); % radius of Earth in km
thetaA=asin(rEarth/(altitude(f)+rEarth)); %angle between altitude line and horizon
distanceHorizon=rEarth/tan(thetaA); %distance from the object to the horizon
lengthRight=distanceHorizon*sin(thetaA); % length at a right angle to altitude line to the horizon point
theta(f) = asin(lengthRight/rEarth);
 coverageRad(f) = rEarth*(theta(f)-5*pi/180);

end
end


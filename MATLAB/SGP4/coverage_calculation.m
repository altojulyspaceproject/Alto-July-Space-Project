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


%% Circle plot function is a function that plots a circle in latitude and longitude for the footprint of a satellite 
%%%% Author: Steph
%% inputs: x = latitude (single value) y=longitude (single value), r is the coverage distance in km 
%% outputs, plots each point on the circumference of the circle using geoplot


function circle_plot(x,y,r)
angleCirc=0:pi/50:2*pi;



xunit = r *cos(angleCirc); % r is coverage (km), find one side of the triangle that defines the point on the circle 




yunit = r*sin(angleCirc); % find the other side of the triangle 
xunit = xunit *180 / 6372/ pi+x; %xunit is in km, x is latitude, change xunit to degrees and combine 
yunit = yunit *180 / 6372/ pi+y; % yunit is km, y is longitude, change yunit to degrees and combine 
for f = 1 :1:length(xunit) % check latitude is between -90 and 90
if xunit(f)>90
    xunit(f)=xunit(f)-180;
elseif xunit(f) <-90
   xunit(f) =xunit(f)+180;
end
end


geoplot(xunit,yunit,'b') % plot each point on the circle 
end
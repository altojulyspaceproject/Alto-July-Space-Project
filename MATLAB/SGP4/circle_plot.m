function circle_plot(x,y,z,r)
angleCirc=0:pi/50:2*pi;

%xy=lla2ecef([x,y,z]);

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


geoplot(xunit,yunit) % plot each point on the circle 
end
%% Circle plot function is a function that plots a circle in latitude and longitude for the footprint of a satellite 
%%%% Author: Steph
%% inputs: x = latitude (single value) y=longitude (single value), r is the coverage distance in km 
%% outputs, plots each point on the circumference of the circle using geoplot


function circle_plot(x,y,r)
angleCirc=0:pi/50:2*pi;



xunit = r *sin(angleCirc); % r is coverage (km), find one side of the triangle that defines the point on the circle % vertical

xunit = xunit *180 / 6372/ pi+x; % converting xunit to degrees and combining with latitude 


yunit = r*cos(angleCirc); % find the other side of the triangle % horizontal
for conv=1:1:length(yunit)
distance(conv)=yunit(conv)/pi*180/6372/cos(xunit(conv)*pi/180); % converting distance in horizontal direction to degrees based on the great circle at each given longitude 
yunit(conv) = distance(conv)+y; % distance is degrees, y is longitude, add the two together to get new longitude  
end
 %xunit is in km, x is latitude, change xunit to degrees and combine

for f = 1 :1:length(xunit) % check latitude is between -90 and 90
    
    %% accounting for when the latitude is at at the poles 
if xunit(f)>90
    xunit(f)=xunit(f)-90;
    xunit(f)=90-xunit(f); 
    yunit(f)=yunit(f)+180;
elseif xunit(f) <-90
   xunit(f) =xunit(f)+90;
   xunit(f)=-90-xunit(f);
   yunit(f)=yunit(f)+180;
end
end


geoplot(xunit,yunit,'b') % plot each point on the circle 
end
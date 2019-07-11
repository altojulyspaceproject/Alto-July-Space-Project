%% the orbital path function uses geoscatter to plot points at increments of 1 min from the current time 90 min forward and back
% author: Steph
%% inputs: the satdata created in the main script, tsince for the tle,
%% epochDate of the tle(found in main script)
%% outputs: plots the path on the current graph if hold is on


function orbital_path(t, satdata,epochDate)
hours_2 = -90:1:90; % creating an array of minutes for 90 minutes before and 90 minutes after
for ff = 1:1:length(hours_2) % creating a for loop to create increments of tsince
    tsince(ff) = t+ hours_2(ff);  % creating increments of t since
end
for ff = 1:1:length(hours_2) % a for loop to recalculate data for each new point of tsince
    [pos(ff,:), vel(ff,:)] = sgp4(tsince(ff), satdata); % running each new tsince through the sgp4
    [posEcef(ff,1),posEcef(ff,2),posEcef(ff,3)] = teme2ecef(pos(ff,1)*1000,pos(ff,2)*1000,pos(ff,3)*1000,epochDate,minutes(tsince(ff))); % converting from teme to ecef
    posLLA=ecef2lla(posEcef); % converting from ecef to lat lon alt
    
end
T3 = table(tsince', pos, vel, 'VariableNames',{'tsince','Position','Velocity'}) ; % tabulating the position data
T4 = table(tsince',posLLA(:,1),posLLA(:,2),posLLA(:,3),'VariableNames',{'tsince','Latitude','Longtitude','Altitude'}); % tabulating the lon lat data
geoscatter(T4.Latitude(1:length(hours_2)/2-.5),T4.Longtitude(1:length(hours_2)/2-.5),'.','r') % plotting the 90 min before
geoscatter(T4.Latitude((length(hours_2)/2+.5):(length(hours_2))),T4.Longtitude((length(hours_2)/2+.5):(length(hours_2))),'.','y') % plotting 90 min  after

end

% MATLAB retrieval of TLE DATA using functions and calculations 
% 
%Author: Stephanie Batten 
%Last modified 3/07/19

%Requirements MATLAB, get_tle.m, isolatetle.m,
%originalmeanmotion.m,secder.m

%usage: run the code to retrieve TLE. You can change the dates of the TLE
%and sattelite on line 25


%Inclination is in degrees 
%Right ascension of the ascending node is in degrees 
%eccentricity no unit 
%argument of perigee is in degrees 
%mean anomaly is in degrees 
%mean motion is in revs per day 
%revolution number at epoch is in revolutions 
clc;
clear;
global tledata tlerel tlefirstline% global variable for the data from the TLE and a second variable for every second line


%% Retrieving the DATA 
tledata = get_tle(25544, 'arajendran@swin.edu.au','Michellehouston89!',0,'2019-06-25','2019-05-02'); % calling the tledata
tledata=tledata';

for i=2:2:length(tledata)
    tlerel{i/2}=tledata{i}; % finding every second line of the tle data 
end
%% Isolating inclination data 
inclination = isolatetle(9,16,tlerel);

%% Isolating right ascending node data 
rightascension = isolatetle(18,25, tlerel);

%% isolating eccentricity data 
eccentricity = isolatetle(27,33,tlerel);

%% isolating argument of perigee data 
argperigee = isolatetle(35,42,tlerel);
%% isolating the mean anomaly data 
meananomaly = isolatetle(44,51,tlerel);

%% isolating mean motion data
meanmotion = isolatetle(53,63,tlerel);

%% time per revolution 
timerevoltion = 1./meanmotion.*24; % the time taken to complete one revolution in hours 

%% isolating revolution at epoch data 
epochrev = isolatetle(64,68,tlerel);

%% isolating check sum data 
checksum = isolatetle(69,69,tlerel);
for i=1:2:length(tledata)-1
    tlefirstline{i/2+1/2}=tledata{i}; % finding every second line of the tle data 
end

firstderivative = isolatetle(34,43,tlefirstline);
secderiv=secder(tlefirstline);
%%
T = table(inclination', rightascension', eccentricity', argperigee', meananomaly', meanmotion', epochrev',checksum',firstderivative',secderiv', 'VariableNames',{'Inclination','RightAscensionNode','Eccentricity','ArgPerigee','MeanAnomaly','MeanMotion','RevEpoch','Checksum','FirstDerivative','SecondDerivative'});

%% 

json1=jsonencode(T);

%% Calculations 
XKMPER = 6378.135;
G=6.67e-11;
M = 5.972e24;
J2 = 1082.645e-6;
J3=2.546e-6;
J4 = -1.649e-6;
aE=6371; 
k2=5.413080e-4;

[ndd0,add0]=originalmeanmotion(G,M,meanmotion(1),k2,aE,eccentricity(5),inclination(1));


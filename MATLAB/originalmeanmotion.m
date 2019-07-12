% function to calculate the orginal mean motion and original mean semi
% major axis using the equations 

function [ndd0,add0]=originalmeanmotion(G,M,meanmotion,k2,aE,eccentricity,inclination)

meanmotion=meanmotion *2*pi/24/60/60; % converting mean motion to radians per second 
inclination = deg2rad(inclination); % inclination to radians 

a1=(sqrt(G*M)/meanmotion)^(2/3); % sqrtGM is ke and uses seconds as part of the unit 

delta1=(3/2)*(k2/a1^(2))*((3*(cos(inclination)^2)-1)/((1-eccentricity^(2))^(3/2)));

a0=a1*(1-(1/3*delta1)-(delta1^(2))-(134/81*(delta1^(3))));

delta0=(3/2)*(k2/(a0^(2)))*(3*(cos(inclination)^2)-1)/((1-eccentricity^(2))^(3/2));

ndd0=meanmotion/(1+delta0); %original mean motion
add0=a0/(1-delta0); % original mean semi major axis 
end
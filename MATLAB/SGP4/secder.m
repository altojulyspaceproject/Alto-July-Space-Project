function [secondDeriv_value, secondDeriv_power]=secder(tle)
  for f=1:1:length(tle)
string = tle{f}; % calling each string individually from the cell 
powersign = 1;
if strcmp(string(51),'-')
    powersign=-1;
end

value = strcat('0.',string(46:50)); % adding the decmal to the sec deriv value 
secondDeriv_value(f) = str2double(value); % turning value into a num from a string 


secondDeriv_power(f) = str2double(string(52));
% secderiv(f) = value2*10^(powersign*power);
    end
end
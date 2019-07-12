function secderiv=secder(tle)
  for f=1:1:length(tle)
string = tle{f}; % calling each string individually from the cell 
powersign = 1;
if strcmp(string(51),'-')
    powersign=-1;
end

value = strcat('0.',string(46:50));
value2 = str2double(value);


power = str2double(string(52));
secderiv(f) = value2*10^(powersign*power);
    end
end
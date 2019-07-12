function variable = isolatetle(start, endindice, tle)
    for f=1:1:length(tle)
string = tle{f}; % calling each string individually from the cell 
    degindices=start;
    if strcmp(string(start),'_') %determining if the data is 2 or 3 digits 
        degindices=start+1;
        if strcmp(string(start+1),'_')
            degindices=start+2;
        end
    end
    inclstring=string(degindices:endindice); % separating the wanted string 
    if start == 27
        inclstring=strcat('0.',inclstring); % adding in the decimal place 
    end
    variable(f) =str2double(inclstring); % converting the string to a number 
    end
end
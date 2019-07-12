function variable = isolatetle(stringStart, stringEnd, tle)
for f=1:1:length(tle)
    string1 = tle{f}; % calling each string individually from the cell
    stringLocation=stringStart;
    if strcmp(string1(stringStart),'_') %determining if the data is 2 or 3 digits
        stringLocation=stringStart+1;
        if strcmp(string1(stringStart+1),'_')
            stringLocation=stringStart+2;
        end
    end
    includeString=string1(stringLocation:stringEnd); % separating the wanted string
    if stringStart == 27
        includeString=strcat('0.',includeString); % adding in the decimal place
    end
    if ismember(stringStart,[34,51,45,54,60,65,9,18,27,35,44,53,64])
        variable(f) =str2double(includeString); % converting the string to a number
    else variable(f) = string(includeString);
    end
end

end
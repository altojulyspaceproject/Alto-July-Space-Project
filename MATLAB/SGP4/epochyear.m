%%%%%%%% This is a function to convert the epoch date of the tle to a time
%%%%%%%% since epoch
%%% Authors: Steph and Matthew

function [tsince,epochDate] = epochyear(epoch)
%% Finding the year
epoch=char(epoch);
yearDigit=str2num(epoch(1:2));% finding the last 2 digits of the year eg for 2019 yearDigit is 19
if yearDigit <57 % the first year a satellite was launched, allows for determing which century
    yearWhole=2000+yearDigit; % combing the first and last two digits of the year for 200s
else yearWhole = 1900+yearDigit; % combinging the first and last two digits of the year for 1900s
end
%% Finding the number of days as a number with decimal part
days=str2num(epoch(3:end)); % isolating the days data
if days >59 % Feburary 29th is the 59 day of the year
    if mod(yearWhole,4)~=0 % the datevec function assumes every year is a leap year, therefore we need to add a day for non leap years
        days = days+1;
    end
end
date = datevec(days); % converting the days data wich is a number with a decimal into an array with month, day, hour, min, sec
month = date(2); % identifying the data
day = date(3);
hour=date(4);
min = date(5);
sec=date(6);
timeNow = datetime('now','Timezone','utc'); % determining the current time
timeThen = datetime(yearWhole,month, day,hour,min,sec,'Timezone','utc'); % determining the time at which the TLE was collected
tsince = timeNow - timeThen;  % finding the time in between now and when the TLE was colelcted
tsince = minutes(tsince); % converting to minutes
epochDate=timeThen;
end

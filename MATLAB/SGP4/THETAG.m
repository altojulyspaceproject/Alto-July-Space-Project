function RESULT = THETAG(InputArg)

DEG2RAD = pi/180;
JDUT1 = juliandate(InputArg);
TUT1= ( JDUT1 - 2451545.0 ) / 36525.0;
TEMP = -6.2e-6*TUT1*TUT1*TUT1+0.093104*TUT1*TUT1+(876600.0*3600+8640184.812866)*TUT1+67310.54841;
RESULT = mod(TEMP*DEG2RAD/240,2*pi);
%Relevant code ends here

%Below gets the greenwich sidereal time at the time input
DAYSEC = 86400;
PRM = RESULT/(2*pi);
SECM = PRM*DAYSEC;
HOURM = SECM/60/60;
Hour = floor(HOURM);
temp = (HOURM - Hour)*60;
Minute = floor(temp);
temp = temp - Minute;
Second = temp*60;
%Need to manually tell it the day and year, not used in the program so I
%didn't set it up to automatically do it. Sorry :'(.
TimeM = datetime(2018,7,5,Hour,Minute,Second);
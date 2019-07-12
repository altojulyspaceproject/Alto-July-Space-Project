%%%%%%%% Open Source Code with alterations.
% code altered by Steph

%%
% This is an open source file from https://au.mathworks.com/matlabcentral/fileexchange/62013-sgp4?s_tid=mwa_osa_a
% alterations have been made to this code and are indicated by a %%%%%%
% additional features added are the abilitly to retrive TLEs from NORAD and
% fixed the error when eccentricity was zero
% open source functions required (same source) are actan.m,
% Convert_Sat_State.m, fmod2.m, modulus.m,sgp4.m.
% Our own functions required are get_tle.m, isolatetle.m, epochyear.m,
% secder.m

%% Setting the environment
clc
clear
close all   
format long g


%% Defining Constants
colour = ['g','c','m'];
ge = 398600.8; % Earth gravitational constant
TWOPI = 2*pi;
MINUTES_PER_DAY = 1440.;
MINUTES_PER_DAY_SQUARED = (MINUTES_PER_DAY * MINUTES_PER_DAY);
MINUTES_PER_DAY_CUBED = (MINUTES_PER_DAY * MINUTES_PER_DAY_SQUARED);

%% Extracting TLE - New Code, the opensource code used a TLE.txt file to extract data. The new code retrieves a TLE from NORAD
%%%%%%%%%%% Retrieving the file from the website using get_tle function, this is an alteration from the open source
objectsNum = inputdlg('How many objects do you want to track? 1, 2 or 3');
switch str2num(objectsNum{1})
    case 1
        norad=inputdlg({'Enter the NORAD ID number, 25544 for ISS : '}); % user input for the NORAD ID
        
    case 2
        norad=inputdlg({'Enter the NORAD ID number, 25544 for ISS : ','Enter the NORAD ID number, 25544 for ISS : '}); % user input for the NORAD ID
        
    case 3
        norad=inputdlg({'Enter the NORAD ID number, 25544 for ISS : ','Enter the NORAD ID number, 25544 for ISS : ','Enter the NORAD ID number, 25544 for ISS : '}); % user input for the NORAD ID
        
end
username = inputdlg('Enter Your Spacetrack Username/Email: '); %user input for the space-track username
figUI=uifigure('Position',[100 100 350 275]);
%text=uitext('Enter Your SpaceTrack Password');
lbl = uilabel(figUI,'Position',[100 200 100 22]);
lbl.Text = 'Enter Password';
passwordUI = uieditfield(figUI,'Position',[100 175 100 22]);
passwordUI.FontColor='white';
passwordUI.BackgroundColor='white';
waitfor(passwordUI,'Value')

password = string(passwordUI.Value);
delete(figUI)
%%password = inputdlg('Enter Your Spacetrack Password: '); % user input for the password

count = inputdlg('How many TLEs do you want? Type 1 for most recent 2 for 2 most recent etc, 0 for between 2 dates: '); % user input number of TLEs required
dateStart=inputdlg('Put in the start date or 0. format: yyyy-mm-dd : ','s'); %  user input for the start date of the TLEs
if strcmp(dateStart,'0') % checking if the dateStart value is zero, ie set number of most recent TLEs was selected
    dateStart =0;
end
dateEnd=inputdlg('Put in the end date or 0. format: yyyy-mm-dd : ','s'); % repeat for date end
if strcmp(dateEnd,'0')
    dateEnd =0;
end
for multi=1:1:length(norad)
    tleData = get_tle(norad{multi}, username,password,str2num(count{1}),dateStart,dateEnd); % calling the tledata using the function get_tle
    %% TLE First Line DATA  %%%%%%%%% Here we extract the first line data using the variable names of the open source code
    for increment=1:2:length(tleData)-1
        tleFirstline{increment/2+1/2}=tleData{increment}; % finding every second line of the tle data
    end
    Cnum = isolatetle(3,7,tleFirstline); % catalog number (NORAD)
    SC = isolatetle(8,8,tleFirstline); % security classification
    ID = isolatetle(10,17,tleFirstline); % identification number
    epoch = isolatetle(19,32,tleFirstline); % epoch
    TD1 =isolatetle(34,43,tleFirstline); % first time derivative
    [TD2,ExTD2] = secder(tleFirstline); % second time derivative
    BStar = isolatetle(54,59,tleFirstline); % Bstar/drag Term
    ExBStar = isolatetle(60,61,tleFirstline); % exponent of BStar /drag ter
    for increment = 1:1:length(tleFirstline) %%%%%%%% for loop for multiple TLEs
        BStar(increment) = BStar(increment) *1e-5*10^ExBStar(increment);
    end
    Etype = isolatetle(63,63,tleFirstline); % ephemeris type
    Enum = isolatetle(65,70,tleFirstline);% element number
    
    %% TLE second Line DATA %%%%%%%%% Extracting the second line data with variable names for the opensource code
    for increment=2:2:length(tleData)
        tleSecondline{increment/2}=tleData{increment}; %%%%%%% finding every second line of the tle data
    end
    
    %%%%%%%% Converting the data to the variable names provided by the open
    %%%%%%%% source code using our own function isolatetle.m.
    i=isolatetle(9,16,tleSecondline); % orbit inclination (degrees)
    raan = isolatetle(18,25,tleSecondline); % right asscension of ascending node (degrees)
    e = isolatetle(27,33,tleSecondline); % eccentricity, decimal point assumed
    omega = isolatetle(35,42,tleSecondline); % argument of perigee (degrees)
    M = isolatetle(44,51,tleSecondline); % mean anomaly (degrees)
    no = isolatetle(53,63,tleSecondline);
    for increment=1:1:length(tleFirstline) %%%%%%% for loop for multiple TLEs
        a = (ge/(no(increment)*2*pi/86400)^2)^(1/3); %%%semi major axis (m), this line is from the open source code
    end
    rNo = isolatetle(64,68,tleSecondline); % revolution number at epoch
    
    
    %%
    %%%%%%%%%%%%%%This section of code is from the open source code and was
    %%%%%%%%%%%%%%used to isolate the data from a TLE.txt file, this has been
    %%%%%%%%%%%%%%removed as it is only useful for a single text file.
    % Open the TLE file and read TLE elements
    
    
    % 19-32	04236.56031392	Element Set Epoch (UTC)
    % 3-7	25544	Satellite Catalog Number
    % 9-16	51.6335	Orbit Inclination (degrees)
    % 18-25	344.7760	Right Ascension of Ascending Node (degrees)
    % 27-33	0007976	Eccentricity (decimal point assumed)
    % 35-42	126.2523	Argument of Perigee (degrees)
    % 44-51	325.9359	Mean Anomaly (degrees)
    % 53-63	15.70406856	Mean Motion (revolutions/day)
    % 64-68	32890	Revolution Number at Epoch
    
    % while (1)
    %     % read first line
    %     tline = fgetl(fid);
    %     if ~ischar(tline)
    %         break
    %     end
    %     Cnum = tline(3:7);      			        % Catalog Number (NORAD)
    %     SC   = tline(8);					        % Security Classification
    %     ID   = tline(10:17);			            % Identification Number
    %     epoch =tline(19:32);              % Epoch
    %     TD1   = str2num(tline(34:43));              % first time derivative
    %     TD2   = str2num(tline(45:50));              % 2nd Time Derivative
    %     ExTD2 = tline(51:52);                       % Exponent of 2nd Time Derivative
    %     BStar = str2num(tline(54:59));              % Bstar/drag Term
    %     ExBStar = str2num(tline(60:61));            % Exponent of Bstar/drag Term
    %     BStar = BStar*1e-5*10^ExBStar;
    %     Etype = tline(63);                          % Ephemeris Type
    %     Enum  = str2num(tline(65:end));             % Element Number
    %
    %     % read second line
    %     tline = fgetl(fid);
    %     if ~ischar(tline)
    %         break
    %     end
    %     i = str2num(tline(9:16));                   % Orbit Inclination (degrees)
    %     raan = str2num(tline(18:25));               % Right Ascension of Ascending Node (degrees)
    %     e = str2num(strcat('0.',tline(27:33)));     % Eccentricity
    %     omega = str2num(tline(35:42));              % Argument of Perigee (degrees)
    %     M = str2num(tline(44:51));                  % Mean Anomaly (degrees)
    %     no = str2num(tline(53:63));                 % Mean Motion
    %     a = ( ge/(no*2*pi/86400)^2 )^(1/3);         % semi major axis (m)
    %     rNo = str2num(tline(64:68));                % Revolution Number at Epoch
    % end
    % fclose(fid);
    
    %%
    pos = zeros(length(tleFirstline),3); % initialising the position array
    vel = zeros(length(tleFirstline),3); % initialising the velocity array
    
    tsince = zeros(length(tleFirstline),1); % initalising the tsince array
    
    %% Creating a Cell to hold the data and pass to the function
    for increment = 1:1:length(tleFirstline) %%%%%%%%%% A for loop to allow multiple TLE's to pass through
        %%%%% This is from the source code, defining the data in the cell in
        %%%%% correct units
        satdata.epoch = epoch(increment);
        satdata.norad_number = {Cnum};
        satdata.bulletin_number = {ID};
        satdata.classification = {SC}; % almost always 'U'
        satdata.revolution_number = rNo(increment);
        satdata.ephemeris_type = {Etype};
        satdata.xmo = M(increment) * (pi/180);
        satdata.xnodeo = raan(increment) * (pi/180);
        satdata.omegao = omega(increment) * (pi/180);
        satdata.xincl = i(increment) * (pi/180);
        satdata.eo= e(increment);
        satdata.xno = no(increment) * TWOPI / MINUTES_PER_DAY;
        satdata.xndt2o = TD1(increment) * 1e-8 * TWOPI / MINUTES_PER_DAY_SQUARED;
        satdata.xndd6o = TD2(increment) * TWOPI / MINUTES_PER_DAY_CUBED;
        satdata.bstar = BStar(increment);
        
        [tsince(increment),epochDate(increment)] = epochyear(epoch(increment)); % determing the time since the TLE was generated
        
        
        [pos(increment,:), vel(increment,:)] = sgp4(tsince(increment), satdata); % running the sgp4 model
        fprintf('     TSINCE              X                Y                Z     [km]\n'); % printing the data in the console window (from the source code)
        fprintf(' %9.1f%22.8f%18.8f%18.8f \n',tsince(increment),pos(increment,1),pos(increment,2),pos(increment,3));
        fprintf('                       XDOT             YDOT             ZDOT    [km/s]\n');
        fprintf('  %28.8f%18.8f%18.8f \n\n',vel(increment,1),vel(increment,2),vel(increment,3));
        
        %% Converting units from TEME to ECEF using the function teme2ecef
        [posEcef(increment,1),posEcef(increment,2),posEcef(increment,3)] = teme2ecef(pos(increment,1)*1000,pos(increment,2)*1000,pos(increment,3)*1000,epochDate(increment),minutes(tsince(increment)));
    end
    %% Converting the units from ECEF to Lon LAt Alt using ecef2lla inbuilt function
    posLLA=ecef2lla(posEcef);
    
    %% Tabulating the data into a time, position and velocity table, and a lla and time table
    T = table(tsince, pos, vel, 'VariableNames',{'tsince','Position','Velocity'}) ;
    T2 = table(tsince,posLLA(:,1),posLLA(:,2),posLLA(:,3),'VariableNames',{'tsince','Latitude','Longtitude','Altitude'});
    
    %% Plotting the map
    % figure(1)
    
    T2.Altitude = T2.Altitude/1000; % converting altitude to KM
    [theta,coverage] = coverage_calculation(T2.Latitude,T2.Altitude); % running the function coverage_calculatio which determines the radius of the footprint in km
    
    
    p(multi)=geoscatter(T2.Latitude,T2.Longtitude,'^','filled',colour(multi)); % using inbuilt function geoscatter to plot the position of the satellite
   
    geobasemap landcover %coloring in the map
    hold on
    for increment =1:1:length(tleFirstline) % creating a for loop to run the data sets through the circle_plot function which plots the foot print
        circle_plot(T2.Latitude(increment),T2.Longtitude(increment),coverage(increment)); % running the function to plot the foot print
    end
    for f =1 : 1 : length(tleFirstline) % creating a for loop to run the function that plots the path
        orbital_path(tsince(f), satdata,epochDate(f)) % running the function orbital_path which plots the path 90 min before and 90 min after
    end
end

hold off
legend(p,norad)
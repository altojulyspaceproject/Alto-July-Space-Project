function tle = get_tle(norad,username,password,count,datestart,dateend)
%% Description
% Function takes a NORAD ID of a satellite and returns the latest TLE for
% that satellite.

% Possible future features: Custom number of TLE's returned,
% multiple TLE searches in one.

%% Code

AuthUri = 'https://www.space-track.org/ajaxauth/login'; %Auth uri

Identity = username; %Username
Password = password; %Password (pls no hek)
if count == 0
    DS = datestr(datestart,'yyyy-mm-dd');
    DE = datestr(dateend,'yyyy-mm-dd');
    Query = strcat(...
    'https://www.space-track.org/',...          %Base Uri
    'basicspacedata/',...                       %Request controller
    'query/',...                                %Request Actions (Required for 'class' predicate)
    'class/tle/',...                            %Request Class
    'EPOCH/',DS,'--',DE,'/',...                 %Date range (from -- to) [datestr(datestart,'yyyy-mm-dd')]
    'NORAD_CAT_ID/',num2str(norad),'/',...      %NORAD ID
    'orderby/','EPOCH',' DESC/',...             %Ordering
    'format/tle');                              %Format of the data (Need TLE)

else
    Query=strcat(...
    'https://www.space-track.org/',...          %Base Uri
    'basicspacedata/',...                       %Request controller
    'query/',...                                %Request Actions (Required for 'class' predicate)
    'class/tle/',...                            %Request Class
    'NORAD_CAT_ID/',num2str(norad),'/',...      %NORAD ID
    'orderby/','EPOCH',' DESC/',...             %Ordering
    'limit/',num2str(count),'/',...             %Number of TLE's returned
    'format/tle');                              %Format of the data (Need TLE)
end

% Two example queries used in testing, they work but don't provide the
% ablilty to change the request. Hence the above bit of code.
%Query = 'https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1--6/NORAD_CAT_ID/5/orderby/EPOCH%20DESC/format/tle'; %Data uri
%Query = 'https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/5/orderby/EPOCH desc/limit/8/format/tle';

Data = webwrite(AuthUri,'identity',Identity,'password',Password,'query',Query);

if isempty(Data) %If no data return empty for error
    tle = char.empty;
    return
elseif length(Data) == 94
    opps = MException('get_tle:LoginError','Incorrect username or password');
    throw(opps);
end

nlidx=strfind(Data,10); %find new line operators
tle{1,1}=Data(1:nlidx(1)-1);
for i=1:length(nlidx)-1 %Put into useable form
    tle{i+1,1} = Data(nlidx(i)+1:nlidx(i+1)-1);
end

for i=1:length(tle) %Replace spaces with underscore, so they dont get lost
    tle{i,1} = regexprep(tle{i,1}, ' ', '_');
end


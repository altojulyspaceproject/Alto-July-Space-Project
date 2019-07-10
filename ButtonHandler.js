var UserName
var Password;
var NoradID;


function ButtonHandler(username , upassword, noradid) {

	UserName = username;
	Password = upassword;
	NoradID = noradid;
	

	console.log(UserName);
	console.log(Password);
	console.log(NoradID);

}




fetchTLEFromServer(noradID, username, password);

//Set the interval to convert the current TLE for the ISS and repeat every 500ms
setInterval(function(){
  longLat = convertTLEtoCoordinates(tleLine1,tleLine2);
  console.log(longLat);
  // latArray.push(longLat["lat"]);
  // longArray.push(longLat["long"]);

  // console.log(latArray);
  // console.log(longArray);

},3000);
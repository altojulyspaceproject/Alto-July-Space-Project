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
	
	fetchTLEFromServer(NoradID, UserName, Password);
	
	setInterval(function(){
	  longLat = convertTLEtoCoordinates(tleLine1,tleLine2);
	  update(longLat);
	  console.log(longLat);
	},3000);
	
	
	
}





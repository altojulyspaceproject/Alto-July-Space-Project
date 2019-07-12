var UserName
var Password;
var NoradID;


function ButtonHandler(username , upassword, noradid) {

	UserName = username;
	Password = upassword;
	NoradID = noradid;
	
	
	fetchTLEFromServer(NoradID, UserName, Password);
	
	setInterval(function(){
	  longLat = convertTLEtoCoordinates(tleLine1,tleLine2);
	  update(longLat);
	  console.log(longLat);
	},3000);
	
	
	
}





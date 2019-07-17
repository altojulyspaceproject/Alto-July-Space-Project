function Request() {

  var spacetrack = require('../');
  var util = require('util');


    const HTTP = require("http");

let request = HTTP.request("www.example.com", { method: "GET" });

request.end();

request.on("error", e => console.error("something went wrong!", e));
request.once("response", res => {
  let string = "";
  res.on("data", chunk => string += chunk);
  res.once("end", () => {
    if (res.statusCode >= 400) {
      console.error(res.statusCode, res.statusMessage);
    }

  // do something with your data (stored in string) here....
  });
});
}
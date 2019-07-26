/*global require,process,console*/

/**
 * Usage:
 *
 * npm install minimist express
 * node app.js [options]
 */

(function () {
    "use strict";

    var BUNDLE_FILE = 'bundles.json',
        options = require('minimist')(process.argv.slice(2)),
        express = require('express'),
        app = express(),
        fs = require('fs'),
        request = require('request');

    // Defaults
    options.port = options.port || options.p || 8080;
    options.host = options.host || options.h || 'localhost'
    options.directory = options.directory || options.D || '.';
    ['include', 'exclude', 'i', 'x'].forEach(function (opt) {
        options[opt] = options[opt] || [];
        // Make sure includes/excludes always end up as arrays
        options[opt] = Array.isArray(options[opt]) ?
                options[opt] : [options[opt]];
    });
    options.include = options.include.concat(options.i);
    options.exclude = options.exclude.concat(options.x);

    // Show command line options
    if (options.help || options.h) {
        console.log("\nUsage: node app.js [options]\n");
        console.log("Options:");
        console.log("  --help, -h               Show this message.");
        console.log("  --port, -p <number>      Specify port.");
        console.log("  --include, -i <bundle>   Include the specified bundle.");
        console.log("  --exclude, -x <bundle>   Exclude the specified bundle.");
        console.log("  --directory, -D <bundle>   Serve files from specified directory.");
        console.log("");
        process.exit(0);
    }

    app.disable('x-powered-by');

    // Override bundles.json for HTTP requests
    app.use('/' + BUNDLE_FILE, function (req, res) {
        var bundles;

        try {
            bundles = JSON.parse(fs.readFileSync(BUNDLE_FILE, 'utf8'));
        } catch (e) {
            bundles = [];
        }

        // Handle command line inclusions/exclusions
        bundles = bundles.concat(options.include);
        bundles = bundles.filter(function (bundle) {
            return options.exclude.indexOf(bundle) === -1;
        });
        bundles = bundles.filter(function (bundle, index) { // Uniquify
            return bundles.indexOf(bundle) === index;
        });

        res.send(JSON.stringify(bundles));
    });

    app.use('/proxyUrl', function proxyRequest(req, res, next) {
        console.log('Proxying request to: ', req.query.url);
        req.pipe(request({
            url: req.query.url,
            strictSSL: false
        }).on('error', next)).pipe(res);
    });

    // Expose everything else as static files
    app.use(express['static'](options.directory));

    //Handle the hamlib post requests

    app.all('/hamlib',function (req,res){


      var cmd = 'sh antPosSet.sh 179.110 18.123;
      var exec = require('child_process').exec;
        var returned;

        var child = exec(cmd, function(error, stdout, stderr){

            console.log('stdout: ' + stdout);
            returned = stdout;

          if(error !== null){
            console.log('exec error: ' + error);
          }

        });

      console.log(stdout);

    });


    //Handle any post requests to the self made page
    app.all('/postExternal',function (req,res){

      var noradID = req.param('noradID');
      var username = req.param('username');
      var password = req.param('password');

      //TODO: Error Handling here
      if(noradID != undefined && username != undefined && password != undefined){
        console.log(noradID);

        var tleHTML = 'https://www.space-track.org/basicspacedata/query/class/tle/NORAD_CAT_ID/ ' 
                    + noradID + '/orderby/EPOCH%20desc/limit/1';

        //TODO: Error handing here
        var cmd = 'curl   https://www.space-track.org/ajaxauth/login -d "identity=' 
                + username +  '&password=' + password + '&query=' + tleHTML + '"';

        var util = require('util');
        var exec = require('child_process').exec;
        var returned;

        var child = exec(cmd, function(error, stdout, stderr){

            console.log('stdout: ' + stdout);
            returned = stdout;

          if(error !== null){
            console.log('exec error: ' + error);
          }

        });
        //TODO: Fix this timeout and react when the command is finished
        setTimeout(() => {
          console.log(returned);
          res.send(returned);
        }, 2000);
      }
      else{
        res.send('Error in parsing variables ');
      }

    });

    // Finally, open the HTTP server and log the instance to the console
    app.listen(options.port, options.host, function() {
      console.log('Open MCT application running at %s:%s', options.host, options.port)
    });
}());

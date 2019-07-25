function antPosSet(ant,ele){
    var cmd = "sh antPosSet.sh";
    var exec = require('child_process').exec;
    var returned;

    var child = exec(cmd, function(error, stdout, stderr){

        console.log('stdout: ' + stdout);
        returned = stdout;
        
      if(error !== null){
        console.log('exec error: ' + error);
      }

    });
}
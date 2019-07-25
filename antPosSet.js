<<<<<<< HEAD
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
=======
function antPosSet(ant, ele){
    const exec = require('child_process').exec, child=[];
    const testscript = exec('sh antPosSet.sh /directory');
    testscript.stdout.on(data,function(data){
    	console.log(data);
    });
testscript.stderr.on('data',function(data){
	console.log(data);
});
    }
>>>>>>> 2e33ba9408edc1b17be2fdac0b0ff8e29a67e6c5

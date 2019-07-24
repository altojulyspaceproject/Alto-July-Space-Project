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
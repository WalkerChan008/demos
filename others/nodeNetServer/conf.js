var fs = require('fs');

var conf = fs.readFileSync('server.conf');
var confArr = conf.toString().split('\r\n');
var confObj = {};

for(var i = 0; i < confArr.length; i ++) {
    var tempArr = confArr[i].split('=');
    if(tempArr.length < 2) {
        continue;
    } else {
        confObj[tempArr[0]] = tempArr[1];
    }
}

if(confObj['path_position'] === 'relative') {
    confObj.baseUrl = __dirname + confObj.path;
} else {
    confObj.baseUrl = confObj.path;
}
debugger
module.exports = confObj;
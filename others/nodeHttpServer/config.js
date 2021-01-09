var fs = require('fs');

var config = {};

var file = fs.readFileSync('./server.conf');
var confArr = file.toString().split('\r\n');

for(var i = 0; i < confArr.length; i ++) {
    var temp = confArr[i].split('=');

    config[temp[0]] = temp[1];
}

if(config.static_file_type) {
    config.static_file_type = config.static_file_type.split('|');
} else {
    throw new Error('配置文件异常，缺少：static_file_type');
}

module.exports = config;
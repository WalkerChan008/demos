var fs = require('fs');
var config = require('./config');

var fileName = config.log_path + config.log_name;

function log(data) {
    // r读 w写 a追加
    fs.appendFile(fileName, data, function () {});  // 追加
    // fs.writeFile(fileName, data + '\r\n', {flag: 'a'}, function () {});
}

module.exports = log;
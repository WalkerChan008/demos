var fs = require('fs');
var config = require('./config');

var filename = config.log_path + '/' + config.log_name;

function log(data) {
    fs.appendFile(filename, data + '\r\n', function () {});
}

module.exports = log;
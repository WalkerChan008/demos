var fs = require('fs');
var config = require('./config');

var apiMap = new Map();

var files = fs.readdirSync(config.web_path);

for(var i = 0; i < files.length; i ++) {
    var temp = require('./' + config.web_path + '/' + files[i]);
    if(temp.path) {
        for(var [k, v] of temp.path) {
            if(apiMap.get(k) == null) {
                apiMap.set(k, v);
            } else {
                throw new Error('url 异常，url：' + k);
            }
        }
    }
}

module.exports = apiMap;
var fs = require('fs');
var config = require('./config');

var pathMap = new Map();

var files = fs.readdirSync(config['web_path']);

for(var i = 0; i < files.length; i ++) {
    var temp = require('./' + config['web_path'] + '/' + files[i]);
    if(temp.path) {
        for(var [k, v] of temp.path) {
            if(pathMap.get(k) == null) {
                pathMap.set(k, v);
            } else {
                throw new Error('url path异常，url：' + k);
            }
        }
    }
}

module.exports = pathMap;
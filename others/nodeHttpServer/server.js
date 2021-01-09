var http = require('http');
var url = require('url');
var fs = require('fs');
var config = require('./config');
var loader = require('./loader');
var log = require('./log');

http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname;
    var params = url.parse(request.url, true).query;
    log(pathName);
    
    var isStatic = isStaticsRequest(pathName);
    if(isStatic) {  // 请求的静态文件
        try {
            var data = fs.readFileSync(config['page_path'] + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();
        } catch (e) {
            response.writeHead(404);
            response.write('<h1>404 NotFound</h1>');
            response.end();
        }
    } else {  // 请求的动态数据
        if(loader.get(pathName) != null) {
            try {
                loader.get(pathName)(request, response);
            } catch (e) {
                response.writeHead(500);
                response.write('<h1>500 BadServer</h1>');
                response.end();
            }
        } else {
            response.writeHead(404);
            response.write('<h1>404 NotFound</h1>');
            response.end();
        }
    }

}).listen(config['port']);

function isStaticsRequest(pathName) {
    for(var i = 0; i < config.static_file_type.length; i ++) {
        var temp = config.static_file_type[i];
        if(pathName.indexOf(temp) === pathName.length - temp.length) {
            return true;
        }
    }
    return false;
}
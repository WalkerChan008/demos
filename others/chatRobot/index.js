var http = require('http');
var url = require('url');
var fs = require('fs');
var config = require('./config');
var apiLoader = require('./apiLoader');

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var isStatic = isRequestStatic(pathname);
    
    if(isStatic) {  // 前端如果请求的是静态文件
        try {
            var data = fs.readFileSync(config.page_path + pathname);
            response.writeHead(200);
            response.write(data);
            response.end();
        } catch (e) {
            response.writeHead(404);
            response.write('<h1>404 NotFound</h1>');
            response.end();
        }
    } else {  // 请求数据
        if(apiLoader.get(pathname)) {
            try {
                apiLoader.get(pathname)(request, response);
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
}).listen(config.port);

function isRequestStatic(pathname) {
    var staticFileType = config.static_file_type;
    var staticFileTypeLen = staticFileType.length;
    var pathnameLen = pathname.length;
    for(var i = 0; i < staticFileTypeLen; i ++) {
        var temp = staticFileType[i];
        if(pathname.indexOf(temp) == pathnameLen - temp.length) {
            return true;
        }
    }
    return false;
}
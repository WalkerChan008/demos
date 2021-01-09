var net = require('net');  // 网络层和传输层  TCP/IP协议
var fs = require('fs');
var conf = require('./conf');

var server = net.createServer();

server.listen(conf.port, '127.0.0.1');

server.on('listening', function () {
    console.log('server started');
})

server.on('connection', function (socket) {
    socket.on('data', function (data) {
        var url = data.toString().split('\r\n')[0].split(' ')[1];
        try {
            var fileData = fs.readFileSync(conf.baseUrl + url);
            socket.write('HTTP/1.1 200OK\r\n\r\n');
            socket.write(fileData);
        } catch (e) {
            socket.write('HTTP 404 NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>');
        }
        socket.end();
    })
})
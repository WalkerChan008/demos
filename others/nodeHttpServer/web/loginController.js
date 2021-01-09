var studentService = require('../service/studentService');
var url = require('url');

var path = new Map();

function getData(request, response) {
    studentService.queryAllStudent(function (res) {
        response.write(JSON.stringify(res));
        console.log(JSON.stringify(res))
        response.end();
    })
    // response.writeHead(200);
}
path.set('/getData', getData);

function login(request, response) {
    var retData = 'Fail';
    var params = url.parse(request.url, true).query;
    studentService.queryStudentByNum(params.num, function (res) {
        if(res && res.length) {
            if(params.pwd === res[0].pwd) {
                retData = 'Success';
            }
        }
        response.writeHead(200);
        response.write(retData);
        response.end();
    })
}
path.set('/login', login);

function loginByPost(request, response) {
    var retData = 'Fail';
    request.on('data', function (data) {
        var params = JSON.parse(data.toString());
        studentService.queryStudentByNum(params.num, function (res) {
            if(res && res.length) {
                if(params.pwd === res[0].pwd) {
                    retData = 'Success';
                }
            }
            response.writeHead(200);
            // response.writeHead(302, {location: 'main.html'});
            response.write(retData);
            response.end();
        })
    })
}
path.set('/loginByPost', loginByPost);

module.exports.path = path;
var url = require('url');
var service = require('../service/robotService');
var log = require('../log');
var path = new Map();

function apiChat(request, response) {
    var params = url.parse(request.url, true).query;
    log('me: ' + params.text);
    service.apiChat(params.text, function (err, resp, body) {
        if(!err && resp.statusCode === 200) {
            var head = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'x-request-with , content-type'
            };
            response.writeHead(200, head);

            var resData = JSON.parse(body);
            if(resData && resData.results && resData.results.length > 0 && resData.results[0].values) {
                log('robot: ' + resData.results[0].values.text);
                response.write(JSON.stringify(resData.results[0].values));
                response.end();
            } else {
                response.write('{text: "偶布吉岛里在嗦甚么啦~"}');
                response.end();
            }
        } else {
            response.writeHead(400);
            response.write('数据异常');
            response.end();
        }
    });
}
path.set('/api/chat', apiChat);

module.exports.path = path;
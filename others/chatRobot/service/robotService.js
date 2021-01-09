var req = require('request');

function apiChat(text, cb) {
    var reqData = {
        'reqType': 0,
        'perception': {
            'inputText': {
                'text': text
            },
        },
        'userInfo': {
            'apiKey': '30253deb2150440fa00a8bbed5c8b6bf',
            'userId': '11123'
        }
    }
    req({
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(reqData)
    }, cb)
}

module.exports = {
    apiChat,
}
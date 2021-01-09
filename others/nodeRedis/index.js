var redis = require('redis');

var port = 6379;
var host = '127.0.0.1';
var password = '123456';

var client = redis.createClient(port, host);
client.auth(password, function () {
    console.log('OK');
});

function setKey(key, val, cb) {
    client.on('connect', function () {
        client.set(key, val, cb);
    });
}

function getKey(key, cb) {
    client.on('connect', function () {
        client.get(key, cb);
    });
}

function hset(hash, key, value, cb) {
    client.on('connect', function () {
        client.hset(hash, key, value, cb);
    });
}

function hget(hash, key, cb) {
    client.on('connect', function () {
        client.hget(hash, key, cb);
    });
}

function hgetall(hash, cb) {
    client.on('connect', function () {
        client.hgetall(hash, cb);
    });
}

function hmset(hash, paramArr, cb) {
    client.on('connect', function () {
        client.hmset(hash, ...paramArr, cb);
    })
}

// setKey('key1', 'val1', function (error, reply) {
//     if(error === null) {
//         console.log(reply);
//     } else {
//         console.log(error);
//     }
// });

// getKey('key1', function (error, reply) {
//     if(error === null) {
//         console.log(reply);
//     } else {
//         console.log(error);
//     }
// });

// hset('map1', 'key1', 'val1', function (error, reply) {
//     if(error === null) {
//         console.log(reply);
//     } else {
//         console.log(error);
//     }
// });
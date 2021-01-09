var mysql = require('mysql');  // 安装驱动

// 创建连接
function createConnection () {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'cnmb11123',
        database: 'school'
    });
    return connection;
}


module.exports = {
    createConnection,
};
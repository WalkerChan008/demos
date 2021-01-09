var dbutil = require('./dbutil');

function queryAllStudent(success) {
    var connection = dbutil.createConnection();
    var querySql = 'select * from student;';

    connection.connect();
    connection.query(querySql, function (err, res) {
        if(err == null) {
            console.log(res);
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}

function queryStudentByClassAndAge(classNum, age) {
    var connection = dbutil.createConnection();
    var querySql = 'select * from student where class = ? and age = ?;';
    var queryParams = [classNum, age];

    connection.connect();
    connection.query(querySql, queryParams, function (err, res) {
        if(error == null) {
            console.log(res);
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}
// queryStudentByClass(2, 17);

function queryStudentByNum(num, success) {
    var connection = dbutil.createConnection();
    var querySql = 'select * from student where num = ?;';

    connection.connect();
    connection.query(querySql, num, function (err, res) {
        if(err == null) {
            success(res);
        } else {
            console.log(err);
        }
    });
    connection.end();
}

module.exports = {
    queryAllStudent,
    queryStudentByClassAndAge,
    queryStudentByNum,
}
var studentDao = require('../dao/studentDao');

function queryAllStudent(success) {
    studentDao.queryAllStudent(success);
}

function queryStudentByNum(num, success) {
    studentDao.queryStudentByNum(num, success);
}

module.exports = {
    queryAllStudent,
    queryStudentByNum,
}
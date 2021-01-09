var utils = {
    getGoodsList: function (cb) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/goodsList.json',
            success: function (data) {
                console.log(data.list);
                cb(data);
            }
        })
    },
    sortBy: function (val) {
        return function (a, b) {
            var val1 = a[val],
                val2 = b[val];
            return val1 - val2;
        }
    }
}

module.exports.utils = utils;
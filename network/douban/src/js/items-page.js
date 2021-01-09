(function () {
    var _id = window.location.search.slice(1).split('=')[1];
    if(_id != undefined) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/' + _id,
            dataType: 'jsonp',
            success: createDom
        })
    }
    
    function createDom(data) {
        console.log(data);
        var str = '<h1>' + data.attrs.title + '</h1>\
                    <div class="details">\
                        <div class="mainpic">\
                            <img src="' + data.image + '" width=135>\
                        </div>\
                        <div class="music-details">\
                            <p>表演者：<span>' + data.attrs.singer + '</span></p>\
                            <p>流派：<span>未知</span></p>\
                            <p>专辑类型：<span>' + data.attrs.version + '</span></p>\
                            <p>介质：<span>' + data.attrs.media + '</span></p>\
                            <p>发行时间：<span>' + data.attrs.pubdate + '</span></p>\
                            <p>出版者：<span>' + data.attrs.publisher + '</span></p>\
                        </div>\
                        <div class="music-score">\
                            <p>豆瓣评分</p>\
                            <div class="rating">\
                                <span class="score">' + data.rating.average + '</span>\
                                <span class="star-score">\
                                    <span class="star"></span>\
                                    <br>\
                                    <span class="num">' + data.rating.numRaters + '人评价</span>\
                                </span>\
                            </div>\
                        </div>\
                    </div>'
        $('.wrapper').html(str);
    }
})()
(function () {
    var $inp = $('.inp'),
        $sub = $('.sub'),
        $mList = $('.music-list'),
        value = '';
    function init() {
        bindEvent();
    }
    function bindEvent() {
        $inp.on('input', debounce(function () {
            value = $inp.val();
            getData(value, 7);
        }, 300))
        $sub.on('click', function (e) {
            e.preventDefault();
            window.location.href = 'file:///E:/wamp64/www/web/ajax/douban/list-page.html?keyword=' + value + '&cpage=1';
        })
    }
    function getData(q, count) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            data: 'q=' + q + '&count=' + count,
            dataType: 'jsonp',
            success: function (data) {
                cbs(data);
            }
        })
    }
    function cbs(data) {
        console.log(data.musics);
        addList(data.musics);
    }
    function addList(dataList) {
        var str = '';
        if(dataList.length > 0) {
            dataList.forEach(function (ele, index) {
                str += '<li>\
                            <a href="file:///E:/wamp64/www/web/ajax/douban/index.html?id=' + ele.id + '">\
                                <div class="data-wrap">\
                                    <img width=40 height=40 src="' + ele.image + '">\
                                    <p>' + ele.author[0].name + ' - ' + ele.title + '</p>\
                                </div>\
                            </a>\
                        </li>'
            })
            $mList.css({display: 'block'}).find('ul').html(str);
        }else {
            $mList.css({display: 'none'});
        }
    }
    function debounce(func, time, flag) {
        var timer = null;
        var debounced = function () {
            var _this = this;
            var argu = arguments;
            clearTimeout(timer);
            if(flag) {
                if(!timer) func.apply(_this, argu);
                timer = setTimeout(function () {
                    timer = null;
                }, time)
            } else {
                timer = setTimeout(function () {
                    func.apply(_this, argu);
                }, time)
            }  
        }
        debounced.cancel = function () {
            clearTimeout(timer);
            timer = null;
        }
        return debounced;
    }
    init();
}())


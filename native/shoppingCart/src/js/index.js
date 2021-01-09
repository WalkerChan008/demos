var utils = require('./utils');
utils = utils.utils;
require('../css/index.less');

function renderPage() {
    var str = '';
    var spectList = [];
    utils.getGoodsList(function (data) {
        
        $.each(data.list, function (index, item) {
            spectList = item.spectList.sort(utils.sortBy('price'));
            str += '<a href="http://localhost:8080/goodsInfo.html?id=' + item.id + '">\
                        <li class="goods-item">\
                            <div class="goods-img"><img src="' + item.imgurl[0] + '" alt=""></div>\
                            <div class="goods-info">\
                                <div class="goods-title">' + item.name + '</div>\
                                <div class="goods-price">￥' + spectList[0].price + ' - ' + spectList[spectList.length - 1].price + '</div>\
                            </div>\
                        </li>\
                    </a>'
        })

        $('.goods-list').html(str);
    })

}

renderPage();
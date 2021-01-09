var utils = require('./utils');
utils = utils.utils;
require('../css/goodsInfo.less');

var id = window.location.search.slice(1).split('=')[1];

function init() {
    utils.getGoodsList(renderGoods);
    bindEvent();
}


function renderGoods(data) {
    var goodsInfo = {};
    var header,
        goodsSpec,
        goodsDetail,
        btn;
    var imgUrl = '';
    var spectList = [];

    $.each(data.list, function (index, item) {
        if(id === item.id) {
            console.log('goodsInfoObj: ');
            console.log(item);
            spectList = item.spectList.sort(utils.sortBy('price'));
            header = $('<div class="header">\
                            <img class="goodsImg" src="' + item.imgurl[0] + '" alt="">\
                            <span class="goodsName">' + item.name + '</span>\
                            <span class="goodsPrice">￥' + spectList[0].price + '-' + spectList[spectList.length - 1].price + '</span>\
                        </div>');

            goodsSpec = $('<div class="goodsSpec">\
                                <span class="left">选择 商品规格</span>\
                                <span class="right">></span>\
                            </div>');
            goodsDetail = '<div class="goodsDetail">\
                                <div class="detailWord">商品详情</div>\
                                <div class="detailCont">\
                                    <div class="title">' + item.name + '</div>\
                                    <ul>';
            $.each(item.imgurl, function (i, url) {
                imgUrl += '<li><img src="' + url + '" alt=""></li>'
            })
            goodsDetail = $(goodsDetail + imgUrl + '</ul></div></div>');
            btn = $('<div class="btn">立即购买</div>');

            return false;
        }
    })

    $('body').append(header)
            .append(goodsSpec)
            .append(goodsDetail)
            .append(btn);
}

function bindEvent() {
    $('body').off().on('click', '.goodsSpec', function () {
        $('.spectCont').css('display', 'block');
        $('body').css('overflow', 'hidden');
    }).on('click', '.btn', function () {

    }).on('click', '.grayArea', function () {
        $('.spectCont').css('display', 'none');
        $('body').css('overflow', 'visible');
    })
}

init();


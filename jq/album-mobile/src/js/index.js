var total = 15,
    liWidth = ($('.wrapper').width() - 40) / 4,
    radio = $(window).height() / $(window).width(),
    nowIndex;

function render() {
    var str = '';
    for(var i = 0; i < total; i ++) {
        str += '<li  style="height: ' + liWidth + 'px"><img src="./src/images/' + i + '.png"></li>';
    }
    $(str).appendTo($('.wrapper')).animate({opacity: 1}, 800);
}
render();

$('.wrapper').on('tap', 'li', function () {
    nowIndex = $(this).index();
    show(nowIndex);
})

function show(i) {
    $('.show').html('').show();
    var Img = new Image();
    Img.src = './src/images/' + i + '.png';
    Img.onload = function () {
        var h = this.height,
            w = this.width;
        if(h/w > radio) {
            $(this).appendTo($('.show')).css('height', '100%').animate({opacity: 1}, 800);
        }else {
            $(this).appendTo($('.show')).css('width', '100%').animate({opacity: 1}, 800);
        }
    }
}

$('.show')
    .on('tap', function () {
        $(this).hide();
    })
    .on('swipeLeft', function () {
        if(nowIndex < total - 1) {
            nowIndex ++;
            show(nowIndex);
        }
    })
    .on('swipeRight', function () {
        if(nowIndex > 0) {
            nowIndex --;
            show(nowIndex);
        }
    })
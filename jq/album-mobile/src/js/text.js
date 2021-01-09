var total = 15,
    liWidth = ($('.wrapper').width() - 40) / 4,
    activeIndex,
    radio = $(window).height() / $(window).width();

function render() {
    var str = '';
    for(var i = 0; i < total; i ++) {
        str += '<li style="height: ' + liWidth + 'px"><img src="./src/images/' + i + '.png"/></li>'
    }
    $(str).appendTo($('.wrapper')).animate({opacity: 1}, 800);
}
render();

$('.wrapper').on('tap', 'li', function () {
    activeIndex = $(this).index();
    show(activeIndex);
})

function show(i) {
    $('.show').html('').show();
    var oImg = new Image();
    oImg.src = './src/images/' + i + '.png';
    oImg.onload = function () {
        var h = this.height,
            w = this.width;
        if(h/w > radio) {
            $(oImg).appendTo($('.show')).css('height', '100%').animate({opacity: 1}, 800);
        }else {
            $(oImg).appendTo($('.show')).css('width', '100%').animate({opacity: 1}, 800);
        }
    }
}

$('.show')
    .on('tap', function () {
        $(this).hide();
    })
    .on('swipeLeft', function () {
        if(activeIndex < total - 1) {
            activeIndex ++;
            show(activeIndex);
        }
    })
    .on('swipeRight', function () {
        if(activeIndex > 0) {
            activeIndex --;
            show(activeIndex);
        }
    })
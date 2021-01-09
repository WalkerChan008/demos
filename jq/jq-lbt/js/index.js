var $moveWidth = parseInt($('li:eq(0)').css('width')),
    $stop = true,
    $count = $('.active').index(),
    timer = null;

timer = setInterval(moveUl, 2500);

// mouseenter时清除定时器
$('.wrapper').on('mouseenter', function () {
    clearInterval(timer);
});

// mouseleave时开启定时器
$('.wrapper').on('mouseleave', function () {
    clearInterval(timer);
    timer = setInterval(moveUl, 2500);
});

// 切换图片左键
$('.btn-left').on('click', function () {
    moveUl(-1);
});

// 切换图片右键
$('.btn-right').on('click', function () {
    moveUl(1);
});

// 点击circle切换到相对应的img
$('.circle').on('click', 'span', function () {
    if($stop) {
        $stop = false;
        var num = $(this).index();
        changeCircle(num);
        $('ul').animate({left: num * -$moveWidth}, 500, function () {
            $count = num;
            $stop = true;
        });
    }
});

// 轮播函数
function moveUl(deraction) {
    if($stop) {
        $stop = false;
        if(deraction == 1 || deraction == undefined) {
            $count ++;
            if($count == 4) {
                $count = 0;
            }
            changeCircle($count);
            $('ul').animate({left: parseInt($('ul').css('left')) - $moveWidth}, 500, function () {
                if($(this).css('left') == '-5120px') {
                    $(this).css('left', '0px');
                }
                $stop = true;
            });
        }
        if(deraction == -1){
            if($('ul').css('left') == '0px') {
                $('ul').css('left', '-5120px');
            }
            $('ul').animate({left: parseInt($('ul').css('left')) + $moveWidth}, 500,function () {
                if($count == -1) {
                    $count = 3;
                }
                $count --;
                changeCircle($count);
                $stop = true;
            });
        }
    }
}

// circle轮播函数
function changeCircle(n) {
    $('.active').removeClass('active');
    $('.circle').find('span').eq(n).addClass('active');
}
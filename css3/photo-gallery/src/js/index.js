var $wrapper = $('.wrapper'),
    $li = $('li', '.content'),
    $close = $('.close');
var timer = setTimeout(function () {
    $li.addClass('item');
    clearTimeout(timer);
}, 200)
$li.click(function () {
    $wrapper.addClass('wrapper-active');
    $('.active').removeClass('active'); 
    $(this).addClass('active');
})
$close.click(function (e) {
    e.stopPropagation();
    $wrapper.removeClass('wrapper-active');
})
var oLiArr = Array.prototype.slice.call(document.getElementsByTagName('li'));

oLiArr.forEach(function (ele, index) {
    ele.addEventListener('mouseenter', function (e) {
        addClass(this, e, 'in');
    }, false)
    ele.addEventListener('mouseleave', function (e) {
        addClass(this, e, 'out');
    }, false)
})

function addClass(ele, e, move) {
    var w = e.offsetX - ele.offsetWidth / 2,
        h = e.offsetY - ele.offsetHeight / 2;
    // console.log(w + ' ' + h);
    var state = (Math.round((Math.atan2(h, w) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    var direction = '';
    // console.log(state);
    switch(state) {
        case 0:
            direction = 'top';
            break;
        case 1:
            direction = 'right';
            break;
        case 2:
            direction = 'bottom';
            break;
        case 3:
            direction = 'left';
    }
    ele.className = move + '-' + direction;
}
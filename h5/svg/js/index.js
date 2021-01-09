/**
 * loading动态图
 */
(function () {
    var circle2 = document.getElementById('circle-block'),
        circleAllLen = circle2.getTotalLength(),
        radialcircleAllLen = circleAllLen / 5;

    circle2.style.strokeDasharray = '100px ' + (circleAllLen - radialcircleAllLen) + 'px';
    circle2.style.strokeDashoffset = circleAllLen + 'px';
}());

/**
 * 仪表盘
 */
(function () {
    var speedPercent = document.getElementById('speed-percent'),
        speed = document.getElementById('speed'),
        speedLen = speed.getTotalLength();

    speedPercent.addEventListener('blur', function () {
        var value = this.value;
        if(value) {
            value = value > 100 ? 100 : value;
            finalLen = speedLen * value / 100;
            speed.style.strokeDashoffset = 1000 - finalLen + 'px';
            speed.style.transition = 'all 0.5s ease-out';
        }
    }, false)
    speedPercent.addEventListener('focus', function () {
        this.value = '';
        speed.style.transition = '';
        speed.style.strokeDashoffset = '1000px';
    }, false)
}());

/**
 * 签名动画
 */
(function () {
    var sntSVG = document.getElementById('snt-svg'),
        pathArr = sntSVG.children,
        dashOffset = 0,
        second = 0.3,
        delay = 0;
    var each = Array.prototype.forEach;

    each.call(pathArr, function (ele, index) {
        dashOffset = Math.floor(ele.getTotalLength());
        ele.style.strokeDashoffset = dashOffset;
        ele.style.transition = 'all ' + second +'s linear ' + delay + 's';
        delay += second;
    })
}());
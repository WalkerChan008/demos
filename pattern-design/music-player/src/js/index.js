var $container = $('.container');
var url = '../mock/data.json';
var root = window.player;
var dataList = [];
var index = 0;
var audioControl = new root.AudioControl();

function init() {
    getData(url);
    bindEvent();
    bindTouch();
}

function bindEvent() {
    $container.off().on('play:change', function (event, index) {
        root.render(dataList[index]);
        audioControl.setAudioSrc(dataList[index].audio);
        root.process.renderEndTime(dataList[index]);
        root.process.updateProcess(0);
        if(audioControl.status == 'play') {
            audioControl.play();
            root.process.start();
        }
    }).on('click', '.like-btn', function () {
        $(this).toggleClass('like-solid');
    }).on('click', '.play-btn', function () {
        if(audioControl.status == 'play') {
            root.process.stop();
            audioControl.pause();
        }else {
            root.process.start();
            audioControl.play();
        }
        $(this).toggleClass('pause');
    }).on('click', '.prev-btn', function () {
        index = SwitchControl.prev();
        $container.trigger('play:change', index);
    }).on('click', '.next-btn', function () {
        index = SwitchControl.next();
        $container.trigger('play:change', index);
    })
}

function bindTouch() {
    var $frontBar = $container.find('.front-bar');
    var offset = $container.find('.pro-bar').offset();
    var left = offset.left,
        width = offset.width;
    $frontBar.on('touchstart', function () {
        root.process.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1) {
            percent = 1;
        }else if(percent < 0) {
            percent = 0;
        }
        root.process.updateProcess(percent);
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if(percent > 1) {
            percent = 1;
        }else if(percent < 0) {
            percent = 0;
        }
        var curDuration = dataList[SwitchControl.index].duration;
        var curTime = curDuration * percent;
        audioControl.playTo(curTime);
        root.process.start(percent);
        $container.find('.play-btn').addClass('pause');
    })
}

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data;
            var len = data.length;
            SwitchControl = new root.SwitchControl(len);
            $container.trigger('play:change', index);
        }
    })
}

init();
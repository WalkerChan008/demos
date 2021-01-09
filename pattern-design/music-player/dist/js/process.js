(function ($, root) {
    var $scope = $('body');
    var curDuration;
    var startTime;
    var lastPercent;
    var cancel;

    function formatTime(duration) {
        var minutes = Math.floor(duration / 60);
        var seconds = duration - minutes * 60;
        if(minutes < 10) {
            minutes = '0' + minutes;
        }
        if(seconds < 10) {
            seconds = '0' + seconds;
        }

        return minutes + ':' + seconds;
    }

    function renderEndTime(data) {
        var time = formatTime(data.duration);
        lastPercent = 0;
        curDuration = data.duration;
        $scope.find('.end-time').html(time);
    }

    function updateProcess(percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(Math.round(curTime));
        $scope.find('.cur-time').html(curTime);

        var percentage = (percent - 1) * 100 + '%';
        var rightPer = (percent - 1) * 10 + 'px !important;';
        $scope.find('.front-bar').css({
            transform: 'translateX(' + percentage + ')'
        })
        $scope.find('.front-bar')
            .html('<style>\
                        .front-bar::after {\
                            right: '+ rightPer +'\
                        }\
                    </style>')
    }

    function start(percentage) {
        lastPercent = percentage === undefined ? lastPercent : percentage; 
        cancelAnimationFrame(cancel);
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (curDuration * 1000);
            if(percent < 1) {
                cancel = requestAnimationFrame(frame);
                updateProcess(percent);
            }else {
                cancelAnimationFrame(cancel);
                $scope.find('.next-btn').trigger('click');
            }
        }
        frame();
    }

    function stop() {
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(cancel);
    }

    root.process = {
        renderEndTime: renderEndTime,
        updateProcess: updateProcess,
        start: start,
        stop: stop
    }

})($, window.player)
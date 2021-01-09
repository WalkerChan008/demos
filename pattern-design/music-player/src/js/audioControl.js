(function ($, root) {
    function AudioControl() {
        this.audio = new Audio();
        this.status = 'pause';
    }

    AudioControl.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSrc: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (curTime) {
            this.audio.currentTime = curTime;
            this.play();
        }
    }

    root.AudioControl = AudioControl;

})($, window.player)
(function () {
    var myCanvas = document.getElementById('my-canvas'),
        w = myCanvas.width,
        h = myCanvas.height,
        ctx = myCanvas.getContext('2d');

    var index = {
        nowIndex: {
            x: 0,
            y: 0
        },
        lastIndex: {
            x: 0,
            y: 0
        }
    }

    function init() {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'destination-out';

        var oImg = new Image();
        oImg.src = './src/img/cat1.jpg';
        oImg.onload = function () {
            myCanvas.style.background = 'url(' + oImg.src + ')';
        }

        bindEvent();
    }
    init();
    
    function bindEvent() {
        myCanvas.addEventListener('mousedown', mouseDown, false);
    }
    function mouseDown(e) {
        index.lastIndex.x = e.clientX - myCanvas.offsetLeft;
        index.lastIndex.y = e.clientY - myCanvas.offsetTop;
        myCanvas.addEventListener('mousemove', mouseMove, false);
        document.addEventListener('mouseup', mouseUp, false);
    }
    function mouseMove(e) {
        clearCanvas(e);
    }
    function mouseUp() {
        clearAll();
        myCanvas.removeEventListener('mousemove', mouseMove, false);
        document.removeEventListener('mouseup', mouseUp, false);
    }
    function clearCanvas(e) {
        index.nowIndex.x = e.clientX - myCanvas.offsetLeft;
        index.nowIndex.y = e.clientY - myCanvas.offsetTop;

        ctx.beginPath();
        // ctx.fillStyle = 'red';

        ctx.moveTo(index.lastIndex.x, index.lastIndex.y);
        ctx.lineTo(index.nowIndex.x, index.nowIndex.y);
        ctx.lineCap = 'round';
        ctx.lineWidth = 30;
        ctx.stroke();

        // ctx.arc(index.nowIndex.x, index.nowIndex.y, 15, 0, Math.PI*2, 0);
        ctx.closePath();
        // ctx.fill();

        index.lastIndex.x = index.nowIndex.x;
        index.lastIndex.y = index.nowIndex.y;
    }
    function clearAll() {
        var pixel = ctx.getImageData(0, 0, w, h).data,
            len = pixel.length,
            count = 0;
    
        for(var i = 0; i < len; i += 4) {
            if(pixel[i] == 0) {
                count ++;
                if(count >= len/5.5) {
                    ctx.clearRect(0, 0, w, h);
                    break;
                }
            }
        }
    }
}())
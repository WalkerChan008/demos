var oDiv = document.getElementsByTagName('div')[0];
var manageCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this;
    },
    removeCookie: function (name) {
        return this.setCookie(name, '', -1);
    },
    getCookie: function (name, callback) {
        var allCookieArr = document.cookie.split('; ');
        for(var i = 0; i < allCookieArr.length; i ++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if(itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}

manageCookie
    .getCookie('eleTop', function (value) {
        oDiv.style.top = value + 'px';
    })
    .getCookie('eleLeft',function (value) {
        oDiv.style.left = value + 'px';
    })

function drag(ele) {
    var disX,
        disY;
    ele.addEventListener('mousedown', function (e) {
        disX = e.clientX - parseInt(window.getComputedStyle(ele, null)['left']);
        disY = e.clientY - parseInt(window.getComputedStyle(ele, null)['top']);
        document.addEventListener('mousemove', position, false);
        ele.addEventListener('mouseup', function () {
            var eleTop = ele.offsetTop,
                eleLeft = ele.offsetLeft;
            manageCookie
                .setCookie('eleTop', eleTop, 10000)
                .setCookie('eleLeft', eleLeft, 10000);
            document.removeEventListener('mousemove', position, false);
        }, false)
    }, false)
    function position(e) {
        ele.style.top = e.clientY - disY + 'px';
        ele.style.left = e.clientX - disX + 'px';
    }
}
drag(oDiv);

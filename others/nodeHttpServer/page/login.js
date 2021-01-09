function ajax(method, url, data, callback, flag) {
    var xhr = null;
    method = method.toUpperCase();
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    console.log(xhr.readyState)
    if(method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + data + '&timer' + timer, flag);
        xhr.send();
    }else if(method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    console.log(xhr.readyState)
    xhr.onreadystatechange = (function () {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                callback(xhr.responseText);
            }else {
                console.log('error');
            }
        }
    })();
}

var oNum = document.getElementById('num'),
    oPwd = document.getElementById('pwd'),
    oSubmit = document.getElementById('submit');

oSubmit.addEventListener('click', function () {
    var num = oNum.value,
        pwd = oPwd.value;
    var reqData = 'num=' + num + '&pwd=' + pwd;
    
    reqData = {
        num,
        pwd,
    }
    reqData = JSON.stringify(reqData);
    loginByPost(reqData);
}, false);

function loginByGet(reqData) {
    ajax('get', '/login', reqData, function (res) {
        if(res === 'Fail') {
            alert('login fail');
        } else {
            alert('login success');
        }
    })
}

function loginByPost(reqData) {
    ajax('post', '/loginByPost', reqData, function (res) {
        if(res === 'Fail') {
            alert('login fail');
            location.href = './main.html';
        } else {
            alert('login success');
        }
    })
}

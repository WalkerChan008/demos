function init() {
    var w = 0,
        h = 0;
    if(document.documentElement) {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    } else {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }
    // setWrapperStyle(w, h);
}
init();

function setWrapperStyle(w, h) {
    var oWrapper = document.getElementsByClassName('robot-wrapper')[0];
    oWrapper.style.width = w - w/5 + 'px';
    oWrapper.style.height = h + 'px';
}

function appendChat(text, type) {
    var $chat = $('<div></div>');
    var $content = $('<span></span>');
    var $img = $('<img></img>');
    // var chat = document.createElement('div');
    // var content = document.createElement('span');
    // var img = document.createElement('img');
    // content.innerHTML = text;
    $content.html(text);
    if (type == 1) {
        $img.attr('src', '../image/cap.jpg')
            .addClass('my-avatar');
        $content.addClass('my-chat');
        // img.src = '../image/cap.jpg';
        // img.style.float = 'right';
        // img.style.width = '35px';
        // img.style.height = '35px';
        // img.style.marginRight = '5px';
        // content.classList.add('my-chat');
    } else {
        $img.attr('src', '../image/tony.jpg')
            .addClass('robot-avatar');
        $content.addClass('robot-chat');
        // img.src = '../image/tony.jpg';
        // img.style.float = 'left';
        // img.style.width = '35px';
        // img.style.height = '35px';
        // img.style.marginLeft = '5px';
        // content.classList.add('robot-chat');
    }

    $chat.append($img)
        .append($content)
        .css({
            overflow: 'hidden',
            marginTop: '15px'
        });
    
    $('.input-box').val('');
    $('.content').append($chat).scrollTop($('.content').prop('scrollHeight'));

    // chat.appendChild(img);
    // chat.style.overflow = 'hidden';
    // chat.style.marginTop = '15px';
    // chat.appendChild(content);
    // document.getElementsByClassName('input-box')[0].value = '';
    // document.getElementsByClassName('content')[0].appendChild(chat);
    // document.getElementsByClassName('content')[0].scrollBy(0, 777);
}

function send(event) {
    if (event instanceof KeyboardEvent && event.key != 'Enter') {
        return;
    }
    var val = document.getElementsByClassName('input-box')[0].value;
    if (val == null || val == '') {
        return;
    }
    appendChat(val, 1);

    var ajax = new XMLHttpRequest();
    ajax.open('get', '/api/chat?text=' + val);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            appendChat(JSON.parse(ajax.responseText).text, 2);
        }

    }
}
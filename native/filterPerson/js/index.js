var personArr = [
    { name : '陈晓', src : './img/cat1.jpg', des : '英俊潇洒', sex : 'm' },
    { name : '王东', src : './img/cat2.jpg', des : '聪明过人', sex : 'm' },
    { name : '陈文婷', src : './img/cat3.jpg', des : '沉鱼落雁', sex : 'f' },
    { name : '陈思敏', src : './img/cat4.jpg', des : '闭月羞花', sex : 'f' },
    { name : '王冰敏', src : './img/cat5.jpg', des : '无法形容', sex : 'f' }
];

var inp = document.getElementsByClassName('search-box')[0],
    oBtn = document.getElementsByClassName('search-option')[0],
    oUl = document.getElementsByTagName('ul')[0];
var state = {
    text : '',
    sex : 'a'
}
function randerList(arr) {
    var str = '';
    arr.forEach(function (ele, index) {
        str += '<li>\
                    <img src="' + ele.src + '" alt="">\
                    <span>\
                        <p>' + ele.name + '</p>\
                        <p>' + ele.des + '</p>\
                    </span>\
                </li>'
    });
    oUl.innerHTML = str;
}
randerList(personArr);

function filterText(text, arr) {
    return arr.filter(function (ele, index) {
        return ele.name.indexOf(text) != -1 ? true : false;
    });
}

function filterSex(sex, arr) {
    if(sex == 'a') {
        return arr;
    }else{
        return arr.filter(function (ele, index) {
            return ele.sex.indexOf(sex) != -1 ? true : false;
        });
    }
    
}

function unionFilter(obj) {
    return function (arr) {
        var lastArr = arr;
        for(var prop in obj) {
            lastArr = obj[prop](state[prop], lastArr);
        }
        return lastArr;
    }
}
var lastFilter = unionFilter({text : filterText, sex : filterSex});

inp.oninput = function () {
    state.text = this.value;
    randerList(lastFilter(personArr));
}

oBtn.addEventListener('click', function (e) {
    if(e.target.nodeName == 'SPAN') {
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
    }
    state.sex = e.target.getAttribute('sex');
    randerList(lastFilter(personArr));
}, false);
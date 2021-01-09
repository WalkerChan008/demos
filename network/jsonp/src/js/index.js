var oWrapper = document.getElementsByClassName('wrapper')[0],
    oInput = document.getElementsByTagName('input')[0],
    oUl = document.getElementsByTagName('ul')[0];
oInput.oninput = function () {
    var value = this.value;
    var oScript = document.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=doJSON';
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
}
oWrapper.onclick = function (e) {
    e.stopPropagation();
}
document.body.onclick = function () {
    oUl.style.display = 'none';
}
function doJSON(data) {
    var s = data.s,
        str = '';
    if(s.length > 0) {
        s.forEach(function (ele, index) {
            str += '<li><a href="https://www.baidu.com/s?wd=' + ele + '">' + ele + '</a></li>';
        })
        oUl.innerHTML = str;
        oUl.style.display = 'block';
    }else {
        oUl.style.display = 'none';
    }
}
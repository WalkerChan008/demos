(function () {
    var oBox = document.getElementsByClassName('box'),
        cpage = 1,
        flag = false,
        liWidth = parseInt(window.getComputedStyle(oBox[0], null)['width']);
    // console.log(liWidth);
    function getData() {
        if(!flag) {
            flag = true;
            ajax('GET', 'http://localhost/web/ajax/waterfall/src/js/getPics.php', 'cpage=' + cpage, createDom, true);
            cpage ++;
        }
    }
    getData();
    function createDom(data) {
        var dataList = JSON.parse(data);
        if(dataList.length > 0) {
            dataList.forEach(function (ele, index) {
                var index = getMinIndex(oBox),
                    oItem = document.createElement('div'),
                    oCover = document.createElement('div'),
                    oImg = new Image(),
                    oP = document.createElement('p');

                oItem.className = 'item';
                oCover.className = 'cover';
                oImg.src = ele.preview;
                oImg.height = ele.height * liWidth / ele.width;
                oCover.style.height = ele.height * liWidth / ele.width;
                oImg.onerror = function () {
                    this.style.width = '202px';
                    this.style.height = this.height + 2;
                    this.style.margin = '-1px';
                }

                oP.innerText = ele.title;
                oCover.appendChild(oImg);
                oItem.appendChild(oCover);
                oItem.appendChild(oP);
                oBox[index].appendChild(oItem);
            })
        }
        flag = false;
    }
    function getMinIndex(dom) {
        var minHeight = dom[0].offsetHeight,
            minIndex = 0,
            i = 1,
            len = dom.length;
        
        for(; i < len; i ++) {
            var ofsHeight = dom[i].offsetHeight;
            if(ofsHeight < minHeight) {
                minHeight = ofsHeight;
                minIndex = i;
            }
        }
        return minIndex;
    }

    window.onscroll = function () {
        var _scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            _windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
            pageHeight = oBox[getMinIndex(oBox)].offsetHeight;
       
        if(_scrollTop + _windowHeight > pageHeight) {
            getData();
        }
            
    }
}())
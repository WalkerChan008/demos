(function () {
    var $wrapper = $('.wrapper'),
        $div1 = $('#div1');
    var dataArr = window.location.search.slice(1).split('&'),
        q = dataArr[0].split('=')[1],
        cpage = parseInt(dataArr[1].split('=')[1]) - 1,
        count = 15,
        start = cpage * count;

    $div1.on('click', function () {
        $div1.html('');
        init();
    })

    function init() {
        getData(q, count, start);
        // console.log(num);
    }
    function getData(q, count, start) {
        $.ajax({
            type: 'get',
            url: 'https://api.douban.com/v2/music/search',
            // data: 'q=' + q + '&count=' + count,
            data: 'q=' + q + '&count=' + count + '&start=' + start,
            dataType: 'jsonp',
            success: addDom
        })
    }
    function addDom(data) {
        console.log(data);
        var musics = data.musics,
            numOfPage = Math.ceil(parseInt(data.total) / 15),
            str = '';
        musics.forEach(function (ele, index) {
            str += '<li><a href="file:///E:/wamp64/www/web/ajax/douban/index.html?id=' + ele.id + '">\
                        <img src="' + ele.image + '" width=80>\
                        <span class="list-details">\
                            <span class="list-song">' + ele.title + '</span>\
                            <span class="list-rating">' + ele.rating.numRaters + '人评价</span>\
                            <span class="list-allmsg">' + ele.attrs.singer + ' / ' + ele.attrs.pubdate + ' / ' + ele.attrs.version + ' / ' + ele.attrs.media + '</span>\
                        </span>\
                    </a></li>';   
        })
        $wrapper.find('.list-title').html('搜索 ' + decodeURI(q)).end()
                .find('.list-content').html(str);
        if(numOfPage > 1) {
            page({id: 'div1', nowNum: cpage + 1, allNum: numOfPage, url: 'file:///E:/wamp64/www/web/ajax/douban/list-page.html?keyword=' + q + '&cpage='});
        }
    }

    function page(json) {
        if (!json.id) return false;
        var $Div = document.getElementById(json.id);            
        var nowNum = json.nowNum;
        var allNum = json.allNum;
        var url = json.url;
        
        console.log(nowNum);
        // 首页
        if (nowNum > 5 && allNum >= 10) {
            var $A = document.createElement('a');
            $A.href = url + '1';
            $A.innerHTML = '首页';
            $Div.appendChild($A);
        }                        
        //上一页
        if (nowNum > 1) {
            var $A = document.createElement('a');
            $A.href = url + (nowNum - 1); 
            $A.innerHTML = '上一页';
            $Div.appendChild($A);                
        }
         
        // 9个一组
        if (allNum <= 9) {
            for (var i = 1; i <= allNum; i++) {
                var $A = document.createElement('a');
                $A.href = url + i;
                if (nowNum === i) {
                    $A.innerHTML = i;
                }else {
                    $A.innerHTML = '[' + i + ']';    
                }                    
                $Div.appendChild($A);
            }
        }else {
            // 以nowNum数为中心 一共 9个数  向左右两侧扩散5 - 1 个数
            for (var i = 1; i <= 9; i++) {
                var $A = document.createElement('a');
                // 当前页数 小于5 时 向左扩散会出现小于1的书 要做特殊处理
                if (nowNum < 5) {
                    $A.href = url + i;
                    if (nowNum === i) {
                        $A.innerHTML = i;
                    }else {
                        $A.innerHTML = '[' + i + ']';     
                    }                          
                }else if (allNum - nowNum < 4) {
                    // 最后几页向右扩散 时也会出问题  所以阻止扩散 只显示最后九页                        
                    $A.href = url + (allNum - 9 + i);
                    // 特殊处理后4几页
                    if ( (allNum - nowNum) === 0 && i === 9 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }else if ( (allNum - nowNum) === 1 && i === 8 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }else if ( (allNum - nowNum) === 2 && i === 7 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }
                    else if ( (allNum - nowNum) === 3 && i === 6 ) {
                        $A.innerHTML = allNum - 9 + i; 
                    }        
                                                                                        
                    else {
                        $A.innerHTML = '['+ (allNum - 9 + i) + ']';                            
                    }                                                 
                }
                // 正常处理方式 以nowNum为中心 向两侧扩散 4个数
                else {
                    $A.href = url + (nowNum - 5 + i); 
                    if (i === 5) {
                        $A.innerHTML = nowNum - 5 + i;
                    }else {
                        $A.innerHTML = '[' + ( nowNum - 5 + i ) + ']';
                    }    
                }
                $Div.appendChild($A);                      
            }
        }    
        
        // 尾页
        if ( (allNum - nowNum) > 5) {
            var $A = document.createElement('a');
            $A.href = url + allNum;
            $A.innerHTML = '尾页';
            $Div.appendChild($A);                
        }
        // 下一页
        if ((allNum -nowNum) > 0) {
            var $A = document.createElement('a');
            $A.href = url + (nowNum + 1); 
            $A.innerHTML = '下一页';
            $Div.appendChild($A);                 
        }          
                     
        var $All = document.getElementsByTagName('a');            
        for (var i = 0; i < $All.length; i++) {
            $All[i].onclick = function () {                    
                var nowNum = parseInt(this.getAttribute('href').substring(1));
                $Div.innerHTML = '';
                page({id: 'div1',nowNum: nowNum, allNum: allNum});                
            }
        }                                                                                                                       
    }
    init();
}())
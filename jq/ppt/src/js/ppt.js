var ppt = {
    $wrapper: $('.wrapper'),
    $ppt: $('.ppt'),
    len: $('.ppt').length,
    nowIndex: 0,
    lastIndex: undefined,
    pptTimer: undefined,
    bStop: true,
    init: function () {
        if(this.len > 1) {
            this.createDom();
            this.bindEvent();
            this.pptAuto();
        }
    },
    createDom: function () {
        var strBtn = '<div class="ppt-btn">\
                            <span class="left-btn"></span>\
                            <span class="right-btn"></span>\
                      </div>',
            strLi = '';
        for(var i = 0; i < this.len; i ++) {
            if(i == 0) {
                strLi += '<li class="active"></li>';
            }else {
                strLi += '<li></li>';
            }
        }
        this.$wrapper.append(strBtn).append('<div class="ppt-order"><ul>' + strLi + "</ul></div>");
    },
    bindEvent: function () {
        var _this = this;
        $('.left-btn').add('.right-btn').add('.ppt-order li').on('click', function () {
            if($(this).attr('class') == 'left-btn') {
                _this.totalFunc('left');
            }else if($(this).attr('class') == 'right-btn') {
                _this.totalFunc('right');
            }else {
                var _index = $(this).index();
                _this.totalFunc(_index);
            }
            
        });
        this.$ppt.on('go', function () {
            $(this).fadeOut(300)
                   .find($('.title')).delay(300).animate({fontSize: '10px'}, 300).end()
                   .find($('.image img')).delay(300).animate({width: '0%'}, 300);
        });
        this.$ppt.on('come', function () {
            $(this).delay(300).fadeIn(300)
                   .find($('.title')).delay(300).animate({fontSize: '20px'}, 300).end()
                   .find($('.image img')).delay(300).animate({width: '100%'}, 300, function () {
                       _this.bStop = true;
                   });
        });
    },
    getIndex: function (index) {
        this.lastIndex = this.nowIndex;
        if(index == 'left') {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        }else if(index == 'right') {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        }else {
            this.nowIndex = index;
        }
    },
    pptAuto: function () {
        var _this = this;
        clearTimeout(this.pptTimer);
        this.pptTimer = setTimeout(function () {
            _this.totalFunc('right');
        }, 3000);
    },
    changeOrder: function (index) {
        $('.active').removeClass('active');
        $('.ppt-order li').eq(index).addClass('active');
    },
    totalFunc: function (direction) {
        if(this.bStop) {
            this.getIndex(direction);
            if(this.nowIndex != this.lastIndex) {
                this.bStop = false;
                this.$ppt.eq(this.lastIndex).trigger('go');
                this.$ppt.eq(this.nowIndex).trigger('come');
                this.changeOrder(this.nowIndex);
                this.pptAuto();
            }
        }   
    }
}
ppt.init();
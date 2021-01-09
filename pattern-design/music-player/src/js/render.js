(function ($, root) {
    var $scope = $('body');

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $scope);
            $scope.find('.img-wrapper img').attr('src', src);
        }
    }

    function renderInfo(info) {
        var html = '<div class="title">' + info.song + '</div>\
                    <div class="singer">' + info.singer + '</div>\
                    <div class="album">' + info.album + '</div>';
        $scope.find('.song-info').html(html);
    }

    function renderIsLike(isLike) {
        if(isLike) {
            $scope.find('.like-btn').addClass('like-solid');
        }else {
            $scope.find('.like-btn').removeClass('like-solid');
        }
    }

    function render(data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }

    root.render = render;

})($, window.player || (window.player = {}));
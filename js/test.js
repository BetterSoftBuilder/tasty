var Tasty = (function () {

    var i = 0;
    var tastyBase = false;

    function _getData() {
        if (!tastyBase) {
            $.when($.getJSON('../json/info_box.json')).then(
                    function (json) {
                        tastyBase = json;
                        $("#imgLoad").hide();
                        _loadContent();
                    }, function () {
                //TODO
            });
        } else {
            return tastyBase;
        }
    }

    function _coverInit(cover) {
        for (var backUrl in cover) {
            cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background': "url(" + cover[backUrl] + ") no-repeat"});
        }
    }

    function _loadAnimation(img) {
        var imgLoad = img;
        var imgWrap = imgLoad.parent();
        imgLoad.show();
        var centerY = imgWrap.scrollTop() + (imgWrap.height() - imgLoad.height()) / 2;
        var centerX = imgWrap.scrollLeft() + (imgWrap.width() - imgLoad.width()) / 2;
        imgLoad.offset({top: centerY, left: centerX});
    }

    function _loadContent() {
        $('#main_img').fadeOut(250, function () {
            $(this).attr('src', 'img/' + tastyBase[i].img).fadeIn(500);
        });
        $('#title').html(tastyBase[i].title);
        $('#text').html(tastyBase[i].description);
        $('#details').html(tastyBase[i].note);
        $('#find').attr('href', tastyBase[i].productUrl);
    }

    function _events() {
        var h = parseInt($("#main_text").css("height"));
        var tasty_box = $("#tasty_box");
        tasty_box.on("click", "#prev", function (e) {
            e.preventDefault();
            _navigation(0);
        });
        tasty_box.on("click", "#next", function (e) {
            e.preventDefault();
            _navigation(1);
        });
        tasty_box.on("click", "#show", function (e) {
            e.preventDefault();
            _showDetails(h);
        });
    }

    function _navigation(nav) {
        if (nav) {
            i++;
            if (i >= tastyBase.length) i = 0;
        } else {
            i--;
            if (i < 0) i = tastyBase.length - 1;
        }
        _loadContent();
    }

    function _showDetails(h) {
        var text = $("#main_text");
        var text_height = $("#main_text").css("height");
        if (text_height == h + 'px' || text_height == h + 200 + 'px') {
            $("#img_cont").stop().animate({opacity: "toggle", height: 'toggle'}, 500);
        }
        if (text_height == h + 'px') {
            text.stop().animate({height: '+=200px'}, 500);
        }
        if (text_height == h + 200 + 'px') {
            text.stop().animate({height: h}, 500);
        }
    }

    return {
        init: function (cover) {
            _coverInit(cover);
            _getData();
            _loadAnimation($("#imgLoad"));
            _events();
        }
    };
}());
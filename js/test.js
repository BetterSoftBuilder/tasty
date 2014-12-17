var Tasty = (function () {

    var i = 0;
    var tastyBase = false;

    $.fn.image = function(src, f) {
        return this.each(function() {
          var i = new Image();
          i.src = src;
          i.onload = f;
          i.id = 'imgLoad';
          this.appendChild(i);
        });
    };

    function _getData() {
        _loadAnimation($("#img_cont"));
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

    function _loadAnimation(container) {
        container.image("img/load.gif",function(){
            var imgLoad = $("#imgLoad");
            imgLoad.show();
            var centerY = container.scrollTop() + (container.height() - imgLoad.height()) / 2;
            var centerX = container.scrollLeft() + (container.width() - imgLoad.width()) / 2;
            imgLoad.offset({top: centerY, left: centerX});
        });
    }

    function _loadContent() {
        _loadAnimation($("#img_cont"));
        $('#main_img').fadeOut(250, function () {
            $(this).attr('src', 'img/' + tastyBase[i].img).fadeIn(500);
            $("#imgLoad").hide();
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
        //_loadAnimation($("#img_cont"));
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
            _events();
        }
    };
}());
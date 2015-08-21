function Tasty(options) {

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

    function getData() {
        loadAnimation($("#img_cont"));
        coverInit();
        if (!tastyBase) {
            $.when($.getJSON('../json/info_box.json')).then(
                    function (json) {
                        tastyBase = json;
                        $("#imgLoad").hide();
                        loadContent();
                    }, function () {
                //TODO
            });
        } else {
            return tastyBase;
        }
    }

    function coverInit(cover) {
        cover = cover || options.cover;
        for (var backUrl in cover) {
            cover[backUrl] && $('#' + backUrl.toString().substr(0, backUrl.toString().length - 3)).css({'background': "url(" + cover[backUrl] + ") no-repeat"});
        }
    }

    function loadAnimation(container) {
        container.image("img/loader.gif",function(){
            var imgLoad = $("#imgLoad");
            imgLoad.show();
            var centerY = container.scrollTop() + (container.height() - imgLoad.height()) / 2;
            var centerX = container.scrollLeft() + (container.width() - imgLoad.width()) / 2;
            imgLoad.offset({top: centerY, left: centerX});
        });
    }

    function loadContent() {
        loadAnimation($("#img_cont"));
        $('#main_img').fadeOut(250, function () {
            $(this).attr('src', 'img/' + tastyBase[i].img).fadeIn(500);
            $("#imgLoad").hide();
        });
        $('#title').html(tastyBase[i].title);
        $('#text').html(tastyBase[i].description);
        $('#details').html(tastyBase[i].note);
        $('#find').attr('href', tastyBase[i].productUrl);
    }

    function events() {
        var h = parseInt($("#main_text").css("height"));
        var tasty_box = $("#tasty_box");
        tasty_box.on("click", "#prev", function (e) {
            e.preventDefault();
            navigation(0);
        });
        tasty_box.on("click", "#next", function (e) {
            e.preventDefault();
            navigation(1);
        });
        tasty_box.on("click", "#show", function (e) {
            e.preventDefault();
            showDetails(h);
        });
    }

    function navigation(nav) {
        if (nav) {
            i++;
            if (i >= tastyBase.length) i = 0;
        } else {
            i--;
            if (i < 0) i = tastyBase.length - 1;
        }
        loadContent();
        //_loadAnimation($("#img_cont"));
    }

    function showDetails(h) {
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

    this.coverInit = coverInit;
    this.getData = getData;
    this.events = events;
};

var tasty = new Tasty({
   cover:  {
                tasty_boxUrl: '../img/comp_plate_graybasic.png',
                prevUrl     : '../img/button_bg_white_left2.png',
                nextUrl     : '../img/button_bg_white_right2.png',
                findUrl     : '../img/button_bg_white_right3.png',
                prevHovUrl  : '../img/button_bg_orange_left2.png',
                nextHovUrl  : '../img/button_bg_orange_right2.png',
                findHovUrl  : '../img/button_bg_orange_right3.png'
            }
});

tasty.coverInit({
                tasty_boxUrl: '../img/comp_plate_graybasic.png',
                prevUrl     : '../img/button_bg_white_right2.png',
                nextUrl     : '../img/button_bg_white_left2.png',
                findUrl     : '../img/button_bg_white_right3.png',
                prevHovUrl  : '../img/button_bg_orange_left2.png',
                nextHovUrl  : '../img/button_bg_orange_right2.png',
                findHovUrl  : '../img/button_bg_orange_right3.png'
            });
tasty.getData();
tasty.events();
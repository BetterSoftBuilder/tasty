function Tasty(options) {

    var index = 0;
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
            $(this).attr('src', 'img/' + tastyBase[index].img).fadeIn(500);
            $("#imgLoad").hide();
        });
        $('#title').html(tastyBase[index].title);
        $('#text').html(tastyBase[index].description);
        $('#details').html(tastyBase[index].note);
        $('#find').attr('href', tastyBase[index].productUrl);
    }

    function events() {
        var h = parseInt($("#main_text").css("height"));
        $("#tasty_box").on('click', function(e){
            e.preventDefault();
            switch (e.target.id) {
                case "prev": navigation(0); break;
                case "next": navigation(1); break;
                case "show": showDetails(h); break;
            }
        });
    }

    function navigation(nav) {
        if (nav) {
            index++;
            if (index >= tastyBase.length) index = 0;
        } else {
            index--;
            if (index < 0) index = tastyBase.length - 1;
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

    (function init() {
        coverInit();
        loadAnimation($("#img_cont"));
        getData();
        events();
    }());

    this.coverInit = coverInit;
    this.getData = getData;
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
function Tasty(options) {

    this.index = 0;
    this.tastyBase = false;
    this.detailsFlag = true;
    this.imgHeight = parseInt($("#img_cont").css("height"));
    this.textHeight = parseInt($("#main_text").css("height")) + this.imgHeight;
    var _this = this;

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
        if (!_this.tastyBase) {
            $.when($.getJSON('../json/info_box.json')).then(
                function (json) {
                    _this.tastyBase = json;
                    $("#imgLoad").hide();
                    loadContent();
                }, function () {
                    console.log('¯\\_(ツ)_/¯');
            });
        } else {
            return _this.tastyBase;
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
            $(this).attr('src', 'img/' + _this.tastyBase[_this.index].img).fadeIn(500);
            $("#imgLoad").hide();
        });
        $('#title').html(_this.tastyBase[_this.index].title);
        $('#text').html(_this.tastyBase[_this.index].description);
        $('#details').html(_this.tastyBase[_this.index].note);
        $('#find').attr('href', _this.tastyBase[_this.index].productUrl);
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
            _this.index++;
            if (_this.index >= _this.tastyBase.length) _this.index = 0;
        } else {
            _this.index--;
            if (_this.index < 0) _this.index = _this.tastyBase.length - 1;
        }
        loadContent();
    }

    function showDetails(h) {
        var mainText = $("#main_text");
        var imgCont = $("#img_cont");
        _this.detailsFlag = !_this.detailsFlag;
        if(_this.detailsFlag) {
            imgCont.show("slow"); mainText.animate({'height': _this.textHeight+'px'}, {'height': (_this.textHeight += _this.imgHeight)+'px'});
        } else {
            imgCont.hide("slow"); mainText.animate({'height': _this.textHeight+'px'}, {'height': (_this.textHeight -= _this.imgHeight)+'px'});
        }
    }

    (function init() {
        coverInit();
        getData();
        events();
    }());

    this.coverInit = coverInit;
    this.getData = getData;
    this.navigation = navigation;
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

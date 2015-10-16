function Tasty(options) {

    this.index = 0;
    this.tastyBase = false;
    this.detailsFlag = true;
    this.scrollTimer = 0;
    var _this = this;

    function getData(path) {
        path = path || options.path;
        if (!_this.tastyBase) {
            $.when($.getJSON(path)).then(
                function (json) {
                    _this.tastyBase = json;
                    loadContent();
                    startAutoscroll();
                }, function () {
                    console.log('¯\\_(ツ)_/¯');
            });
        } else {
            return _this.tastyBase;
        }
    }

    function genID() {
        return 'tasty_' + Math.random().toString(36).substr(2, 9);
    }

    function render(elem) {
        $.when($.get('../js/other/render.tmp')).then(function (template) {
            $(elem).append(template);
            _this.mainId = '#' + genID();
            $('#tasty_box').attr("id", _this.mainId.substr(1,_this.mainId.length));
            _this.mainId = $(_this.mainId);
            coverInit();
            getData();
            events();
        });
    }

    function coverInit(cover) {
        cover = cover || options.cover;
        for (var backUrl in cover) {
            cover[backUrl] && _this.mainId.find('#' + backUrl.toString().substr(0, backUrl.toString().length - 3)).css({'background': "url(" + cover[backUrl] + ") no-repeat"});
        }
    }

    function loadContent() {
        _this.mainId.find('#img_cont').fadeOut(250, function () {
            $(this).css({'background' : 'url(img/' + _this.tastyBase[_this.index].img + ') no-repeat'}).fadeIn(500);
        });
        _this.mainId.find('#title').html(_this.tastyBase[_this.index].title);
        _this.mainId.find('#text').html(_this.tastyBase[_this.index].description);
        _this.mainId.find('#details').html(_this.tastyBase[_this.index].note);
        _this.mainId.find('#find').attr('href', _this.tastyBase[_this.index].productUrl);
    }

    function events() {
        _this.imgHeight = parseInt(_this.mainId.find("#img_cont").css("height"));
        _this.textHeight = parseInt(_this.mainId.find("#main_text").css("height")) + _this.imgHeight;
        _this.mainId.on('click', function(e){
            e.preventDefault();
            stopAutoscroll();
            switch (e.target.id) {
                case "prev": prev(); break;
                case "next": next(); break;
                case "show": showDetails(); break;
            }
        });
    }

    function prev() {
        _this.index--;
        if (_this.index < 0) _this.index = _this.tastyBase.length - 1;
        loadContent();
    }

    function next() {
        _this.index++;
        if (_this.index >= _this.tastyBase.length) _this.index = 0;
        loadContent();
    }

    function startAutoscroll(interval) {
        interval = interval || options.interval;
        _this.scrollTimer = setInterval(function() { next();}, interval);
    }

    function stopAutoscroll() {
        clearInterval(_this.scrollTimer);
    }

    function showDetails() {
        var mainText = _this.mainId.find("#main_text");
        var imgCont = _this.mainId.find("#img_cont");
        _this.detailsFlag = !_this.detailsFlag;
        if(_this.detailsFlag) {
            imgCont.slideDown().animate({ opacity: 1 },{ queue: false});
            mainText.animate({'height': _this.textHeight+'px'}, {'height': (_this.textHeight += _this.imgHeight)+'px'});
        } else {
            imgCont.slideUp().animate({ opacity: 0 },{ queue: false});
            mainText.animate({'height': _this.textHeight+'px'}, {'height': (_this.textHeight -= _this.imgHeight)+'px'});
        }
    }

    (function init() {
        render(options.location);
    }());

    this.coverInit = coverInit;
    this.getData = getData;
    this.prev = prev;
    this.next = next;
    this.startAutoscroll = startAutoscroll;
    this.stopAutoscroll = stopAutoscroll;
};

var tasty = new Tasty({
    path: '../js/other/info_box.json',
    location: 'body',
    interval: 5000,
    cover:  {
                tasty_wrapUrl: '../img/comp_plate_graybasic.png',
                prevUrl      : '../img/button_bg_white_left2.png',
                nextUrl      : '../img/button_bg_white_right2.png',
                findUrl      : '../img/button_bg_white_right3.png',
                prevHovUrl   : '../img/button_bg_orange_left2.png',
                nextHovUrl   : '../img/button_bg_orange_right2.png',
                findHovUrl   : '../img/button_bg_orange_right3.png'
            }
});
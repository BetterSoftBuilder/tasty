angular.module('tasty', [])
    .controller('TastyBox', function ($scope) {

        $.fn.image = function(src, f) {
            return this.each(function() {
              var i = new Image();
              i.src = src;
              i.onload = f;
              i.id = 'imgLoad';
              this.appendChild(i);
            });
        };

        $scope.tastyBase = false;

        $scope.i = 0;

        $scope.cover = {
                            tasty_boxUrl: '../img/comp_plate_graybasic.png',
                            prevUrl     : '../img/button_bg_white_left2.png',
                            nextUrl     : '../img/button_bg_white_right2.png',
                            findUrl     : '../img/button_bg_white_right3.png',
                            prevHovUrl  : '../img/button_bg_orange_left2.png',
                            nextHovUrl  : '../img/button_bg_orange_right2.png',
                            findHovUrl  : '../img/button_bg_orange_right3.png'
                        };

        $scope._getData = function() {
            $scope._loadAnimation($("#img_cont"));
            if (!$scope.tastyBase) {
                $.when($.getJSON('../json/info_box.json')).then(
                        function (json) {
                            $scope.tastyBase = json;
                            $("#imgLoad").hide();
                            $scope._loadContent();
                        }, function () {
                    //TODO
                });
            } else {
                return $scope.tastyBase;
            }
        };

        $scope._coverInit = function() {
            for (var backUrl in $scope.cover) {
                $scope.cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background': "url(" + $scope.cover[backUrl] + ") no-repeat"});
            }
        };

        $scope._loadAnimation = function(container) {
            container.image("img/loader.gif",function(){
                var imgLoad = $("#imgLoad");
                imgLoad.show();
                var centerY = container.scrollTop() + (container.height() - imgLoad.height()) / 2;
                var centerX = container.scrollLeft() + (container.width() - imgLoad.width()) / 2;
                imgLoad.offset({top: centerY, left: centerX});
            });
        };

        $scope._loadContent = function() {
            $scope._loadAnimation($("#img_cont"));
            $('#main_img').fadeOut(250, function () {
                $(this).attr('src', 'img/' + $scope.tastyBase[$scope.i].img).fadeIn(500);
                $("#imgLoad").hide();
            });
            $('#title').html($scope.tastyBase[$scope.i].title);
            $('#text').html($scope.tastyBase[$scope.i].description);
            $('#details').html($scope.tastyBase[$scope.i].note);
            $('#find').attr('href', $scope.tastyBase[$scope.i].productUrl);
        };

        $scope._events = function() {
            var h = parseInt($("#main_text").css("height"));
            var tasty_box = $("#tasty_box");
            tasty_box.on("click", "#prev", function (e) {
                e.preventDefault();
                $scope._navigation(0);
            });
            tasty_box.on("click", "#next", function (e) {
                e.preventDefault();
                $scope._navigation(1);
            });
            tasty_box.on("click", "#show", function (e) {
                e.preventDefault();
                $scope._showDetails(h);
            });
        };

        $scope._navigation = function(nav) {
            if (nav) {
                $scope.i++;
                if ($scope.i >= $scope.tastyBase.length) $scope.i = 0;
            } else {
                $scope.i--;
                if ($scope.i < 0) $scope.i = $scope.tastyBase.length - 1;
            }
            $scope._loadContent();
            //_loadAnimation($("#img_cont"));
        };

        $scope._showDetails = function(h) {
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
        };

        $scope.init = function() {
            $scope._coverInit();
            $scope._getData();
            $scope._events();
        };

    });
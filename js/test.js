var tastyApp = angular.module('tastyApp', ['ngMaterial','ngAnimate']);

tastyApp.controller('TastyBox', ['$scope', '$interval', '$http', function($scope, $interval, $http) {

        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $interval(function() {
          $scope.determinateValue += 1;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
          }
        }, 100, 0, true);

        $scope.tastyBase = false;

        $scope.h = parseInt($("#text_cont>p").css("height"));

        $scope.index = 0;

        $scope.$watch('index',function (newIndex) {
            if (newIndex >= $scope.tastyBase.length) $scope.index = 0;
            if (newIndex < 0) $scope.index = $scope.tastyBase.length - 1;
        });

        $scope.cover = {
                            tasty_boxUrl: '../img/comp_plate_graybasic.png',
                            prevUrl     : '../img/button_bg_white_left2.png',
                            nextUrl     : '../img/button_bg_white_right2.png',
                            findUrl     : '../img/button_bg_white_right3.png',
                            prevHovUrl  : '../img/button_bg_orange_left2.png',
                            nextHovUrl  : '../img/button_bg_orange_right2.png',
                            findHovUrl  : '../img/button_bg_orange_right3.png'
                        };

        $scope.getData = function() {
            //$scope._loadAnimation($("#img_cont"));
            if (!$scope.tastyBase) {
                $http.post('../json/info_box.json').success(
                    function (json) {
                        $scope.tastyBase = json;
                    }).error(function () {
                        //TODO
                    });
            } else {
                return $scope.tastyBase;
            }
        };

        $scope.coverInit = function() {
            for (var backUrl in $scope.cover) {
                $scope.cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background': "url(" + $scope.cover[backUrl] + ") no-repeat"});
            }
        };

        $scope._loadAnimation = function(container) {
            var centerY = container.scrollTop() + (container.height() - imgLoad.height()) / 2;
            var centerX = container.scrollLeft() + (container.width() - imgLoad.width()) / 2;
            imgLoad.offset({top: centerY, left: centerX});
        };

        $scope.showDetails = function(h) {
            var text = $(".main_text");
            var text_height = $(".main_text").css("height");
            if (text_height == $scope.h + 'px' || text_height == $scope.h + 200 + 'px') {
                $("#img_cont").stop().animate({opacity: "toggle", height: 'toggle'}, 500);
            }
            if (text_height == $scope.h + 'px') {
                text.stop().animate({height: '+=200px'}, 500);
            }
            if (text_height == $scope.h + 200 + 'px') {
                text.stop().animate({height: $scope.h}, 500);
            }
        };

        $scope.init = function() {
            $scope.coverInit();
            $scope.getData();
        };

}]);

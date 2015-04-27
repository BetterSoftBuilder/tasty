var tastyApp = angular.module('tastyApp', ['ngMaterial','ngAnimate']);

tastyApp.controller('TastyBox', ['$scope', '$http', '$animate', function($scope, $http, $animate) {

        $scope.tastyBase = false;
        $scope.imgHeight = parseInt($("#img_cont").css("height"));
        $scope.textHeight = parseInt($(".main_text").css("height")) + $scope.imgHeight;
        $scope.textDisplay = false;
        $scope.loadDisplay = false;
        $scope.index = 0;

        var cover = {
            tasty_boxUrl: '../img/comp_plate_graybasic.png',
            prevUrl     : '../img/button_bg_white_left2.png',
            nextUrl     : '../img/button_bg_white_right2.png',
            findUrl     : '../img/button_bg_white_right3.png',
            prevHovUrl  : '../img/button_bg_orange_left2.png',
            nextHovUrl  : '../img/button_bg_orange_right2.png',
            findHovUrl  : '../img/button_bg_orange_right3.png'
        };

        $scope.$watch('textDisplay', function (flag) {
            var mainText = $(".main_text");
            flag ? $animate.animate(mainText, {'height': $scope.textHeight+'px'}, {'height': ($scope.textHeight += $scope.imgHeight)+'px'}) :
                   $animate.animate(mainText, {'height': $scope.textHeight+'px'}, {'height': ($scope.textHeight -= $scope.imgHeight)+'px'});
        });

        $scope.$watch('index',function (newIndex) {
            if (newIndex >= $scope.tastyBase.length) $scope.index = 0;
            if (newIndex < 0) $scope.index = $scope.tastyBase.length - 1;
        });

        var getData = function() {
            loadAnimation($("#img_cont"));
            if (!$scope.tastyBase) {
                $http.get('json/info_box.json').success(
                    function (json) {
                        $scope.loadDisplay = false;
                        $scope.tastyBase = json;
                    }).error(function () {
                        console.log('error');
                    });
            } else {
                return $scope.tastyBase;
            }
        };

        var coverInit = function() {
            for (var backUrl in cover) {
                cover[backUrl] && $('#' + backUrl.toString().substr(backUrl.toString().length - 3, 3)).css({'background': "url(" + cover[backUrl] + ") no-repeat"});
            }
        };

        var loadAnimation = function(container) {
            var imgLoad = $(".md-hue-2");
            var centerY = container.scrollTop() + (container.height() - imgLoad.height()) / 2;
            var centerX = container.scrollLeft() + (container.width() - imgLoad.width()) / 2;
            imgLoad.offset({top: centerY, left: centerX});
            $scope.loadDisplay = true;
        };

        $scope.init = function() {
            coverInit();
            getData();
        };

}]);

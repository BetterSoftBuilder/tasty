var tastyApp = angular.module('tastyApp', ['ngMaterial','ngAnimate']);

tastyApp.controller('TastyBox', ['$scope', '$interval', '$http', '$animate', function($scope, $interval, $http, $animate) {

        $scope.mode = 'query';
        $scope.determinateValue = 30;
        $interval(function() {
          $scope.determinateValue += 1;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
          }
        }, 100, 0, true);

        $scope.tastyBase = false;

        $scope.imgHeight = parseInt($("#img_cont").css("height"));
        $scope.textHeight = parseInt($(".main_text").css("height")) + $scope.imgHeight;
        $scope.textDisplay = false;
        $scope.index = 0;

        $scope.$watch('textDisplay', function (flag) {
            //$scope.textHeight = flag ? ($scope.textHeight += $scope.imgHeight) : ($scope.textHeight -= $scope.imgHeight);
            flag ? $animate.animate($(".main_text"), {'height': $scope.textHeight+'px'}, {'height': ($scope.textHeight += $scope.imgHeight)+'px'}) :
                   $animate.animate($(".main_text"), {'height': $scope.textHeight+'px'}, {'height': ($scope.textHeight -= $scope.imgHeight)+'px'});
        });

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
                $http.get('json/info_box.json').success(
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

        $scope.init = function() {
            $scope.coverInit();
            $scope.getData();
        };

}]);

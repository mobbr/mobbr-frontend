'use strict';

angular.module('mobbr.directives').directive('mobbrbutton', function factory() {
    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: '../../views/directives/mobbrbutton.html',
        scope: {
            size:'@',
            url:'@'
        },
        controller: function ($scope, $rootScope) {
            $scope.createButtonUrl = function(size,url){
                // temporary undefined urls fix, make sure the size is known here at all times
                size = size || 'large';
                return api_url + '/button/' + md5(url) + '/' + size + '#' + $rootScope.uniqueButton;
            }
            $scope.submit = function ($event) {
                mobbr.makePayment($scope.url, $event.target);
            }
        }

    }
})
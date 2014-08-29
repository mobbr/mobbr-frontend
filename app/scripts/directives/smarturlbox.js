angular.module('mobbr.directives').directive('mobbrSmartUrlBox', function factory() {
    'use strict';
    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/smarturlbox.html',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.form = {};

            if (!attrs.urlType) {
                scope.form.type = 'URL';
            } else {
                scope.form.type = attrs.urlType;
            }
        },
        controller: function ($scope, $location, $window) {
            $scope.gotoUrl = function () {
                if ($scope.form.url) {
                    switch ($scope.form.type) {
                        case 'URL':
                            $location.path('/task/' + $window.btoa($scope.form.url));
                            break;
                        case 'CROWS':
                            $location.path('/crowds/' + $scope.form.url);
                            break;
                        case 'TASK':
                            $location.path('/tasks/' + $window.btoa($scope.form.url));
                            break;
//                        case 'PEOPLE':
//                            $location.path('/person/' + $window.btoa($scope.form.url));
//                            break;


                    }
                }
            };
        }

    };
})
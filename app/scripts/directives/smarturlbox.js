angular.module('mobbr.directives').directive('mobbrSmartUrlBox', function factory($window) {
    'use strict';
    var placeholders = {'URL':'Enter any URL we\'ll analyze it','CROWDS':'Enter a keyword','TASK': 'Enter a keyword', 'PEOPLE':'Enter any email, username or profile id'};

    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/smarturlbox.html',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.form = {};

            attrs.$observe('url', function(){
                scope.form.url = $window.atob(attrs.url);
            });

            if (!attrs.urlType) {
                scope.form.type = 'URL';
            } else {
                scope.form.type = attrs.urlType;
            }

            scope.placeHolders = placeholders;
        },
        controller: function ($scope, $location, $window) {


            $scope.gotoUrl = function () {
                if ($scope.form.url) {
                    var url = $window.btoa($scope.form.url);
                    switch ($scope.form.type) {
                        case 'URL':
                            $location.path('/task/' + url);
                            break;
                        case 'CROWDS':
                            $location.path('/crowds/' + url);
                            break;
                        case 'TASK':
                            $location.path('/tasks/' + url);
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
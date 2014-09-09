angular.module('mobbr.directives').directive('mobbrSmartUrlBox', function factory() {
    'use strict';
    var placeholders = {
        'URL': 'Enter any URL we\'ll analyze it',
        'CROWDS': 'Enter a keyword',
        'TASK': 'Enter a keyword',
        'PEOPLE': 'Enter any email, username or profile id'
    };

    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/smarturlbox.html',
        scope: {
            query: '=',
            activeQuery: '=',
            urlType: '@'
        },
        link: function (scope, elem, attrs, $window) {
            scope.placeHolders = placeholders;
        },
        controller: function ($scope, $state, $window) {
            $scope.gotoUrl = function (query) {

                var url = $window.btoa(query);

                switch ($scope.urlType) {
                    case 'URL':
                        $state.go($state.includes('box.task.view') ? $state.current.name : 'box.task.view', { task: url });
                        break;
                    case 'CROWDS':
                        if (query) {
                            $state.go('box.crowds.task', { task: url });
                        } else {
                            $state.go('box.crowds');
                        }
                        break;
                    case 'TASK':
                        $state.go('box.tasks.tag', { tag: url });
                        break;
//                        case 'PEOPLE':
//                            $location.path('/person/' + $window.btoa($scope.form.url));
//                            break;
                }
            };
        }
    };
});
angular.module('mobbr.directives').directive('mobbrSmartUrlBox', function factory() {
    'use strict';
    var placeholders = {
            'TASK': 'Enter any URL we\'ll analyze it',
            'CROWDS': 'Enter any URL, we\'ll find your workforce',
            'TASKS': 'Enter a username or just ENTER to show fitting tasks',
            'PROFILE': 'Enter any email, username or profile id'
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

            $scope.setType = function (type) {

                if ($scope.activeQuery && !$scope.savedQuery) {
                    $scope.query = '';
                    $scope.savedQuery = $scope.activeQuery;
                    $scope.savedType = $scope.urlType;
                }

                if ($scope.savedType && $scope.savedType === type && $scope.savedQuery === $scope.activeQuery) {
                    $scope.query = $scope.savedQuery;
                    $scope.savedQuery = null;
                    $scope.savedType = null;
                }

                $scope.urlType = type;
            }

            $scope.gotoUrl = function (query) {

                var url = $window.btoa(query);

                switch ($scope.urlType) {
                    case 'TASK':
                        console.log('state goo');
                        $state.go($state.includes('box.task.view') ? $state.current.name : 'box.task.view', { task: url });
                        break;
                    case 'CROWDS':
                        if (query) {
                            $state.go('box.crowds.task', { task: url });
                        } else {
                            $state.go('box.crowds');
                        }
                        break;
                    case 'TASKS':
                        if (query) {
                            $state.go('box.tasks.person', { person: query });
                        } else {
                            $state.go('box.tasks');
                        }
                        break;
                    case 'PROFILE':
                        $state.go('person', { username: query });
                        break;
                }
            };
        }
    };
});
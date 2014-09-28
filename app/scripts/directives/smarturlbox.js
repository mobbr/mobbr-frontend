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
        controller: function ($scope, $state, $window, $timeout) {

            var opener;

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
                $scope.isopen = false;
            }

            $scope.setOpen = function () {
                $scope.unsetOpen();
                opener = $timeout(function () {
                    $scope.isopen = true;
                }, 500);
            }

            $scope.unsetOpen = function () {
                opener && $timeout.cancel(opener);
            }

            $scope.gotoUrl = function (query) {

                var url = $window.btoa(query);

                switch ($scope.urlType) {
                    case 'TASK':
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
                            $state.go('box.tasks.person', { person: $window.encodeURIComponent(query) });
                        } else {
                            $state.go('box.tasks');
                        }
                        break;
                    case 'PROFILE':
                        $state.go('person', { username: $window.encodeURIComponent(query) });
                        break;
                }
            };
        }
    };
});
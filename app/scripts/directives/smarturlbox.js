angular.module('mobbr.directives').directive('mobbrSmartUrlBox', function factory(mobbrSession) {
    'use strict';
    var placeholders = {
            'TASK': 'To make a payment to a task, drop the task URL here',
            'CROWDS': 'Enter any URL to browse matching workforce',
            'TASKS': 'Enter a username to browse fitting tasks',
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
            urlType: '@',
            user: '='
        },
        link: function (scope, elem, attrs, $window) {
            scope.placeHolders = placeholders;
        },
        controller: function ($scope, $state, $window, $timeout) {

            var opener,
                url_test = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i,
                user_test = new RegExp('^[A-Z0-9_-]{4,32}$', 'i');

            $scope.mobbrSession = mobbrSession;
            $scope.$state = $state;
            $scope.isopen = false;
            $scope.isfocus = false;

            $scope.queryChange = function () {
                $scope.is_url = $scope.query && url_test.test($scope.query);
                $scope.is_user = $scope.query && $scope.query.indexOf('http') !== 0 && user_test.test($scope.query);
            }

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

            $scope.encodeTask = function (query) {
                return $window.btoa(query);
            }

            $scope.gotoUrl = function (query) {

                var url = $scope.encodeTask(query);

                $window.ga('send', 'event', 'box', 'search ' + $scope.urlType.toLowerCase(), 'query', query);

                if ($scope.is_url) {

                    switch ($scope.urlType) {
                        case 'CROWDS':
                            $state.go('crowds', { task: url });
                            break;
                        case 'TASK':
                        case 'TASKS':
                        case 'PROFILE':
                            $state.go('task', { task: url });
                            break;
                    }

                } else if ($scope.is_user) {

                    switch ($scope.urlType) {
                        case 'TASKS':
                            $state.go('tasks', { username: $window.encodeURIComponent(query) });
                            break;
                        case 'PROFILE':
                        case 'TASK':
                        case 'CROWDS':
                            $state.go('person', { username: $window.encodeURIComponent(query) });
                            break;
                    }

                } else {

                    switch ($scope.urlType) {
                        case 'TASK':
                            $state.go('task');
                            break;
                        case 'CROWDS':
                            $state.go('crowds', { task: null });
                            break;
                        case 'TASKS':
                            $state.go('tasks');
                            break;
                        case 'PROFILE':
                            $state.go('person');
                            break;
                    }
                }

                $scope.isopen = false;
                $scope.isfocus = false;
            };

            $scope.queryChange();
        }
    };
});
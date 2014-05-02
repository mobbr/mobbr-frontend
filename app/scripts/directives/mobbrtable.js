'use strict';

angular.module('mobbr.directives').directive('mobbrtable', function factory($rootScope) {

    var labels = {
            gravatar: '',
            '.gravatar': '',
            '.x-id': 'Person',
            datetime: 'Date/time',
            title: 'Title',
            username: 'Username',
            amount: 'Amount',
            share: 'Share',
            '.percentage': 'Share',
            role: 'Role',
            roles: 'Roles',
            url: 'URL',
            senders: 'Semders',
            receivers: 'Receivers',
            name: 'Name',
            keywords: 'Keywords'
        }, sortables = {
            '.x-id': 'x-id',
            datetime: 'datetime',
            username: 'username',
            amount: 'amount',
            share: 'share',
            title: 'title',
            url: 'url',
            '.percentage': 'share',
            roles: 'roles',
            role: 'role'
        };

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'views/directives/mobbrtable.html',
        scope: {
            entries: '='
        },
        controller: function ($scope, $attrs) {

            $scope.labels = labels;
            $scope.sortables = sortables;
            $scope.sortOrder = false;
            $scope.showEntries = 10;
            $scope.hasSearch = $scope.$eval($attrs.hasSearch) === true && true || false;
            $scope.hasHeader = $scope.$eval($attrs.hasHeader) === true && true || false;
            $scope.hasLimiter = $scope.$eval($attrs.hasLimiter) === true && true || false;
            $scope.canSort = $scope.$eval($attrs.canSort) === true && true || false;
            $scope.noEntries = $scope.$eval($attrs.noEntriesMsg) === false && false || true;
            $scope.noEntriesMsg = $scope.$eval($attrs.noEntriesMsg) || 'No entries found';
            $scope.columns = $scope.$eval($attrs.columns);

            $scope.encodeuri = function (url) {
                return window.btoa(url);
            }

            $scope.sort = function (column) {
                if (sortables[column]) {
                    if ($scope.sortEntries !== column) {
                        $scope.sortEntries = column;
                    } else {
                        $scope.sortOrder = !$scope.sortOrder;
                    }
                }
            }
        }
    }
});
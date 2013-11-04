'use strict';

angular.module('mobbr.directives').directive('mobbrtable', function factory(userSession) {

    var labels = {
            gravatar: '',
            '.gravatar': '',
            '.x-id': 'Person',
            username: 'Person',
            amount: 'Amount',
            share: 'Share',
            '.percentage': 'Share',
            role: 'Role',
            roles: 'Roles'
        }, sortables = {
            '.x-id': 'x-id',
            username: 'username',
            amount: 'amount',
            share: 'share',
            roles: 'roles',
            role: 'role'
        };

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: '../../views/directives/mobbrtable.html',
        scope: {
            entries: '=',
            noEntries: '='
        },
        controller: function ($scope, $attrs) {

            $scope.labels = labels;
            $scope.sortables = sortables;
            $scope.sortOrder = false;
            $scope.hasSearch = $scope.$eval($attrs.hasSearch) === false && false || true;
            $scope.columns = $scope.$eval($attrs.columns);

            $scope.parseAmount = function (currency, amount) {
                var negative;
                amount = parseFloat(amount);
                negative = amount < 0;
                amount = Math.abs(amount);
                if (amount.toLocaleString !== undefined) {
                    return (negative ? '-' : '') + currency + ('' + Math.abs(amount).toFixed(2));
                }
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
/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope) {
    'use strict';

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        var toName = toState.name.split('.'),
            fromName = fromState.name.split('.');

        if (fromName[1] !== toName[1]) {
            if (fromParams.task && fromParams.task !== toParams.task) {
                $scope.query = null;
                $scope.activeQuery = null;
            }

            if (fromParams.username && fromParams.username !== toParams.username) {
                $scope.query = null;
                $scope.activeQuery = null;
            }
        }
    });

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });
});
/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $rootScope, $state, $window, mobbrSession, MobbrKeywords, MobbrUri, mobbrMsg) {
    'use strict';

    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        if (fromParams.task && fromParams.task !== toParams.task) {
            $scope.query = null;
            $scope.activeQuery = null;
        }

        if (fromParams.person && fromParams.person !== toParams.person) {
            $scope.query = null;
            $scope.activeQuery = null;
        }
    });

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });
});
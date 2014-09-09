/* global purl */
angular.module('mobbr.controllers').controller('BoxController', function ($scope, $state, $window) {
    'use strict';

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });
});
angular.module('mobbr.controllers').controller('BoxController', function ($scope) {
    'use strict';

    $scope.$on('set-query', function (event, query) {
        $scope.query = query;
    });

    $scope.$on('set-active-query', function (event, activeQuery) {
        $scope.activeQuery = activeQuery;
    });

    $scope.$on('set-task', function (event, task) {
        $scope.taskType = task && task.result.script.type || null;
        $scope.taskMessage = task && task.result.script.message || null;
        $scope.taskAddresses = task && task.result.addresses;
    });

    $scope.$watch('filter_language', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            $scope.$broadcast('language-update', newValue);
        }
    }, true);
});
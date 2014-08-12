'use strict';

angular.module('mobbr.controllers').controller('TasksController', function ($scope, $state, $window) {

    $scope.state = $state;
    $scope.task = $window.atob($state.params.task);
    $scope.query = $scope.task;
});
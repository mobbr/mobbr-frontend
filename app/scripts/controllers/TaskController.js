'use strict';

angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state) {

    $scope.queryTask($state.params.task);
});
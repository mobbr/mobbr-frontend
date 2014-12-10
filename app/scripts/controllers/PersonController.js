angular.module('mobbr.controllers').controller('PersonController', function ($scope, $state, keywords, person) {
    'use strict';

    $scope.username = $state.params.username;
    $scope.keywords = keywords;
    $scope.person = person.result;
    $scope.$emit('set-query', $scope.username);
    $scope.$emit('set-active-query', $scope.username);
});

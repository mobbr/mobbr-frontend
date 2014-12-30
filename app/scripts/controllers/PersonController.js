angular.module('mobbr.controllers').controller('PersonController', function ($scope, $rootScope, $state, keywords, person) {
    'use strict';

    $scope.username = $state.params.username;
    $scope.keywords = keywords;
    $scope.person = person && person.result;
    $rootScope.query = $scope.username;
    $rootScope.activeQuery = $scope.username;
});

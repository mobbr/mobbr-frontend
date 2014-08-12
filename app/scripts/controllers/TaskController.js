'use strict';

angular.module('mobbr.controllers').controller('TaskController', function ($scope, $state, $window, MobbrUri, MobbrKeywords) {

    $scope.info = MobbrUri.info({ url: $scope.task });
    $scope.keywords = MobbrKeywords.uri({ url: $scope.task });
    console.log($scope.info);
    //$scope.task = $window.btoa($state.params.task);
});
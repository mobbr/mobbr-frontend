'use strict';

angular.module('mobbr.controllers').controller('TaskDomainController', function ($scope, $rootScope, $window, $state, $location, MobbrUri) {

    $scope.urls = MobbrUri.get({
        domain: purl($window.atob($state.params.task)).data.attr.host
    });
});
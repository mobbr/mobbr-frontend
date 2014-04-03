'use strict';

angular.module('mobbr.controllers').controller('ApiController', function ($scope, MobbrApi) {

    $scope.apiCalls = MobbrApi.methods();
});

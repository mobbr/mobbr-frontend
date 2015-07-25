'use strict';

angular.module('mobbr.controllers').controller('ForExController', function ($scope, MobbrApi) {

	$scope.currencies = MobbrApi.currencies();
});
'use strict';

angular.module('mobbr.controllers').controller('PaymentsController', function ($scope, payments) {

    $scope.data = payments;
});
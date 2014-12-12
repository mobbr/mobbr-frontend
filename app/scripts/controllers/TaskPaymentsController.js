'use strict';

angular.module('mobbr.controllers').controller('TaskPaymentsController', function ($scope, payments) {
    $scope.payments = payments;
});
'use strict';

angular.module('mobbr.controllers').controller('XPaymentsController', function ($scope, xpayments) {

    $scope.payments = xpayments;
});
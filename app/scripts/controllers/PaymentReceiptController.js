'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $state, payment, external) {
    $scope.payment = payment;
    $scope.external = external;
    $scope.close = function () {
        if ($state.includes('main.payment') || $state.includes('main.x-payment')) {
            $state.go('main');
        } else {
            $scope.$dismiss();
        }
    }
});
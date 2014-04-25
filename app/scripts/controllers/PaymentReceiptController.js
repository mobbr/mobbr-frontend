'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $stateParams, $location, MobbrPayment, MobbrXPayment) {

    var params = { id: $stateParams.id };

    $scope.external = false;

    if ($location.path().indexOf('x-payment') !== -1) {
        $scope.external = true;
        $scope.payment = MobbrXPayment.info(params);
    } else {
        $scope.payment = MobbrPayment.info(params);
    }
});
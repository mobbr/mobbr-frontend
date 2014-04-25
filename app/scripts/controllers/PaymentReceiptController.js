'use strict';

angular.module('mobbr.controllers').controller('PaymentReceiptController', function ($scope, $routeParams, $location, MobbrPayment, MobbrXPayment) {

    var params = { id: $routeParams.id };

    $scope.external = false;

    if ($location.path().indexOf('x-payment') !== -1) {
        $scope.external = true;
        $scope.payment = MobbrXPayment.info(params);
    } else {
        $scope.payment = MobbrPayment.info(params);
    }
});
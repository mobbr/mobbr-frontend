'use strict';

angular.module('mobbr.controllers').controller('TaskPayController', function ($scope, $window, $state, MobbrPayment) {

    function preview() {
        return $scope.payment = MobbrPayment.preview({
            data: window.atob($state.params.task),
            currency: $scope.currency.currency_iso,
            amount: $scope.amount,
            invoiced: $scope.invoiced || false,
            referrer: $window.location.href
        });
    }

    $scope.preview = function () {
        $scope.show_preview = true;
        return preview();
    }

    $scope.pay = function () {
        $scope.confirm = MobbrPayment.confirm({
            hash: $scope.payment.result.hash
        });
    }

    $scope.previewPay = function () {
        preview().$promise.then($scope.pay);
    }
});
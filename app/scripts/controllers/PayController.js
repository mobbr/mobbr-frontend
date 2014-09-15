'use strict';

angular.module('mobbr.controllers').controller('PayController', function ($scope, $window, $state, MobbrPayment) {

    function preview() {

        var data = $state.includes('box.task') && window.atob($state.params.task) || $scope.activeQuery;

        return $scope.payment = MobbrPayment.preview({
            data: data,
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
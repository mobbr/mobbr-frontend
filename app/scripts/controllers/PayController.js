'use strict';

angular.module('mobbr.controllers').controller('PayController', function ($scope, $window, $state, MobbrPayment) {

    function preview() {

        var data = $state.includes('box.task') && window.atob($state.params.task) || $scope.activeQuery || $scope.payQuery;

        return $scope.payment = MobbrPayment.preview({
            data: data,
            currency: $scope.currency.currency_iso,
            amount: $scope.amount,
            invoiced: $scope.invoices || false,
            referrer: $window.location.href
        }, function () {
            $scope.confirm = undefined;
            $scope.payError = false;
        });
    }

    $scope.preview = function () {
        $scope.show_preview = true;
        preview();
    }

    $scope.pay = function () {
        $scope.confirm = MobbrPayment.confirm({
            hash: $scope.payment.result.hash
        }, function (response) {
            $scope.payment = undefined;
            $scope.payError = false;
        }, function (response) {
            $scope.payment = undefined;
            $scope.payError = true;
        });
    }

    $scope.previewPay = function () {
        preview().$promise.then($scope.pay);
    }
});
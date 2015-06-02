'use strict';

angular.module('mobbr.controllers').controller('PayController', function ($scope, $window, $state, $stateParams, MobbrPayment, task) {

    function preview() {

        var data = $state.includes('task') && window.atob($state.params.task) || $scope.activeQuery || $scope.payQuery;

        return $scope.payment = MobbrPayment.preview({
            data: data,
            currency: $scope.currency,
            amount: $scope.amount,
            invoiced: $scope.invoices || false,
            referrer: $window.location.href
        }, function () {
            $scope.confirm = undefined;
            $scope.payError = false;
            $window.ga('send', 'event', 'finance', 'preview', 'amount', $scope.amount);
        }, function () {
            $scope.show_preview = false;
            $scope.payment = null;
            $scope.confirm = null;
            $window.ga('send', 'event', 'error', 'preview', 'amount', $scope.amount);
        });
    }

    $scope.preview = function () {
        $scope.show_preview = true;
        preview();
    };

    function pay() {
        $scope.confirm = MobbrPayment.confirm({
            hash: $scope.payment.result.hash
        }, function (response) {
            $scope.payment = undefined;
            $scope.payError = false;
            $window.ga('send', 'event', 'finance', 'pay', 'amount', $scope.amount);
            $state.go('^', $stateParams, { reload: true });
        }, function (response) {
            $scope.confirm = null;
            $scope.payment = undefined;
            $scope.payError = true;
            $window.ga('send', 'event', 'error', 'pay', 'amount', $scope.amount);
        });
    }

    $scope.pay = function () {
        if(task && task.result.script.type == 'pledge') {
            preview().$promise.then(pay);
        }
        else {
            pay();
        }
    };

    $scope.task = task;
});
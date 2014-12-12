'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, MobbrXPayment, balance, xpayments) {

    var initial_limit = 10;

    function getPayments() {
        return MobbrXPayment.get({
            limit: initial_limit,
            search: $scope.filterText || null,
            offset: $scope.limiter - initial_limit
        });
    }

    $scope.more = function () {

        $scope.limiter += initial_limit;
        $scope.payments.$resolved = false;

        getPayments().$promise.then(function (response) {
            $scope.payments.result = $scope.payments.result.concat(response.result);
            $scope.payments.$resolved = true;
        });
    };

    $scope.search = function () {
        $scope.limiter = initial_limit;
        $scope.payments = getPayments();
    };

    $scope.limiter = initial_limit;
    $scope.dashboard = balance;
    $scope.payments = xpayments;
});
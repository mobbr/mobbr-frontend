'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $state, MobbrXPayment, balance, supportedCurrencies, xpayments) {

    $scope.dashboard = balance;
    $scope.payments = xpayments;
    $scope.supportedCurrencies = supportedCurrencies;

    function redirect() {
        if ($state.current.name === 'payments.xpayments' && $scope.payments.result.length === 0) {
            $state.go('^');
        }
    }

    $scope.addBitcoinAddress = function (currency) {
        MobbrXPayment.newAccountAddress({ currency: currency }, function () {
            supportedCurrencies.$supportedCurrencies();
        });
    }

    $scope.$on('$stateChangeSuccess', redirect);
});
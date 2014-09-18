'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, MobbrXPayment, balance, supportedCurrencies, xpayments) {

    $scope.dashboard = balance;
    $scope.payments = xpayments;
    $scope.supportedCurrencies = supportedCurrencies;

    $scope.addBitcoinAddress = function (currency) {
        MobbrXPayment.newAccountAddress({ currency: currency }, function () {
            supportedCurrencies.$supportedCurrencies();
        });
    }
});
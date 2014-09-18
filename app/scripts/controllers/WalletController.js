'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, MobbrXPayment, balance, supportedCurrencies) {

    $scope.dashboard = balance;

    $scope.supportedCurrencies = supportedCurrencies;

    $scope.addBitcoinAddress = function (currency) {
        MobbrXPayment.newAccountAddress({ currency: currency }, function () {
            supportedCurrencies.$supportedCurrencies();
        });
    }
});
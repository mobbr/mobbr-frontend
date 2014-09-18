'use strict';

angular.module('mobbr.controllers').controller('AddressesController', function ($scope, MobbrXPayment, supportedCurrencies) {

    $scope.supportedCurrencies = supportedCurrencies;

    $scope.addBitcoinAddress = function (currency) {
        MobbrXPayment.newAccountAddress({ currency: currency }, function () {
            supportedCurrencies.$supportedCurrencies();
        });
    }
});
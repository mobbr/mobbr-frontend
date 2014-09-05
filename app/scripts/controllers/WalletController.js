'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, MobbrXPayment, MobbrBalance) {

    $scope.dashboard = {};

    MobbrXPayment.get(function (response) {
        $scope.payments = response.result;
    });

    function retrieveSupportedCurrencies() {
        MobbrXPayment.supportedCurrencies(function (response) {
            // nices to create a tidy structure in the controller then in the view
            $scope.walletAddresses = response.result;

        });
    }

    retrieveSupportedCurrencies();

    MobbrBalance.get(function (response) {
        if (response && response.result) {
            $scope.dashboard.total_currency_iso = response.result.total_currency_iso;
            $scope.dashboard.total_amount = response.result.total_amount;
            $scope.dashboard.balances = response.result.balances;
        }
    });

    $scope.addBitcoinAddress = function (currency) {
        MobbrXPayment.newAccountAddress({currency: currency}, function () {
            retrieveSupportedCurrencies();
        });
    }

    $scope.depositDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/deposit_popup.html',
            controller: 'DepositController'
        });
    }

    $scope.withdrawDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/withdraw_popup.html',
            controller: 'WithdrawController'
        });
    }

    $scope.xpayments = { open: true };
});
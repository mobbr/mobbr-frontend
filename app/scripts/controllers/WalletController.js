'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, $window, $location, MobbrBalance, MobbrXPayment, MobbrPayment) {

    var querystring = $window.location.search;

    if (querystring) {
        $window.location.href = $window.location.href.replace(querystring, '') + querystring;
    }

    $scope.newPayments = MobbrPayment.new();
    $scope.historicPayments = MobbrPayment.historic();

    function onConfirmDeposit() {
        $location.search('transactionId', null);
        reload();
    }

    function reload() {
        $scope.balances = MobbrBalance.user();
        $scope.mutations = MobbrXPayment.get();
        $scope.supportedCurrencies = MobbrXPayment.supportedCurrencies();
    }

    $scope.generateAddress = function (currency) {
        $scope.generating = MobbrXPayment.newAccountAddress({
                currency: currency
            },
            reload
        );
    }

    $scope.openDepositDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/deposit_popup.html',
            controller: 'DepositController'
        }).result.then(function (response) {
            $window.location.href = response;
        });
    }

    $scope.openWithdrawDialog = function () {
        $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/withdraw_popup.html',
            controller: 'WithdrawController'
        }).result.then(reload);
    }

    if ($location.search().transactionId) {
        MobbrXPayment.confirmDeposit({
                trx_id: $location.search().transactionId
            },
            onConfirmDeposit,
            onConfirmDeposit
        );
    }

    reload();
});
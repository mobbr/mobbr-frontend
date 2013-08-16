'use strict';

angular.module('mobbr.controllers').controller('DashboardController', function ($scope, $rootScope, Balances,userSession, Util, Dashboard, Msg, PaymentNetwork) {

    $scope.searchentries;                // filter on search criteria
    $scope.searchentriesAllPayments;                // filter on search criteria
    $scope.currencyDescription = function(iso){
        return $rootScope.currencyDescription(iso);
    }
    $scope.balances = [];
    if(userSession.authenticated){
        Balances.balance(function(response){
            $scope.balances = response.result;
        });
    }
    $scope.sortOrderBalance;
    $scope.sortBalance = function (column) {
        $scope.sortOrderBalance = column;
    }
    $scope.mutations = [];
    if(userSession.authenticated){
        Balances.payments(function(response){
            $scope.mutations = response.result;
        });
    }
    $scope.sortOrderPayments;
    $scope.sortPayments = function (column) {
        $scope.sortOrderPayments = column;
    }

    //$scope.$parent.withdraw_currency = '';
    //$scope.$parent.withdraw_amount = '';
    //$scope.$parent.withdraw_address = '';
    //$scope.$parent.withdraw_note = '';

    $scope.$rootScope = $rootScope;

    /*$scope.withdraw = function () {

        Dashboard.withdraw({

            currency: $rootScope.withdraw_currency,
            amount: $rootScope.withdraw_amount,
            address: $rootScope.withdraw_address,
            service: 'bitcoin',
            note: $rootScope.withdraw_note

        }, function (response) {
            Msg.setResponseMessage('success', 'Successful withdrawal', response);
            $rootScope.withdraw_currency = '';
            $rootScope.withdraw_amount = '';
            $rootScope.withdraw_address = '';
            $rootScope.withdraw_note = '';
        }, function (response) {
            Msg.setResponseMessage('error', '', response);
        });
    }

    Dashboard.paymentservices(function (response) {
        if(response.result != null){
            $scope.withdraw_currencies = response.result.send_to;
        }else if(response.message != null){
            console.log('error loading currencies' + response.error.status);
        }
    });

    Bitcoin.bitcoinaddresses(function (response) {
        $scope.bitcoinaddresses = response.result;
    });

    $scope.newBitcoinaddress = function () {
        Bitcoin.newBitcoinaddress(function (response) {
            $scope.bitcoinaddresses.push(response.result);
        });
    }*/

    PaymentNetwork.networks(function (response) {

        var i = 0,
            l = response.result.length;

        $scope.networks = [];

        for (; i < l; i++) {
            $scope.networks.push({
                name: response.result[i],
                addresses: PaymentNetwork.accountAddresses({ network: response.result[i] }),
                currencies: PaymentNetwork.supportedCurrencies({ network: response.result[i] })
            });
        }

        $scope.network_method = $scope.networks[0];
    });

    $scope.newAccountAddress = function (network_method) {
        PaymentNetwork.newAccountAddress({ network: network_method.name }, function (response) {
            network_method.addresses = PaymentNetwork.accountAddresses({ network: network_method.name })
        });
    }

    $scope.withdraw = function (network, currency, amount, to_address, note) {
        PaymentNetwork.sendPayment({network: network, currency: currency, amount: amount, to_address: to_address, note: note}, function (response) {
            Msg.setResponseMessage('success', 'Successfully sent', response);
        }, function (response) {
            Msg.setResponseMessage('error', 'Send failed', response);
        });
    }

    /*$scope.getAddresses = function (network) {
        return PaymentNetwork.accountAddresses({ network: network });
    }*/

});
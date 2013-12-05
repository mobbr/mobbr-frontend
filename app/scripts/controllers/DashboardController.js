'use strict';

angular.module('mobbr.controllers').controller('DashboardController', function ($scope, $rootScope, Balances,userSession, Util, Dashboard, Msg, PaymentNetwork, $window, $routeParams, $location) {

    $scope.searchentries;                // filter on search criteria
    //$scope.searchentriesAllPayments;                // filter on search criteria
    $scope.currencyDescription = function(iso){
        return $rootScope.currencyDescription(iso);
    }
    $scope.balances = [];
    $scope.reloadBalances = function () {
        if(userSession.authenticated){
            Balances.balance(function(response){
                $scope.balances = response.result;
            });
        }
    } ;
    $scope.reloadBalances();


    $scope.sortOrderBalance;
    $scope.sortBalance = function (column) {
        $scope.sortOrderBalance = column;
    }
    $scope.mutations = [];
    $scope.reloadMutation =  function ( ) {
        if(userSession.authenticated){
            Balances.payments(function(response){
                $scope.mutations = response.result;
            });
        }
    };
    $scope.reloadMutation();

    $rootScope.$watch('reloadPayments', function(newValue, oldValue) {
        if(newValue != undefined){
            console.log(' reloading payments from rootscope') ;
            $scope.reloadMutation();
            $scope.reloadBalances();
        }
    });


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

    if ($routeParams.transactionId) {
        PaymentNetwork.confirmDeposit({ trx_id: $routeParams.transactionId }, function () {
            $location.search('transactionId', null);
        });
    }

    $scope.networks = {
        btc: {
            name: 'Bitcoin',
            currencies: [ 'BTC' ],
            default_currency: 'BTC'
        },
        iban: {
            name: 'IBAN',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            default_currency: 'EUR'
        }
    };

    $scope.$watch('network_method.name', function (oldval, newval) {
        $scope.network_method.send = { currency: $scope.network_method.default_currency };
    }, false);

    $scope.deposit_currency = $scope.networks['iban'].default_currency;
    $scope.network_method = $scope.networks['iban'];

    $scope.deposit = function () {
        PaymentNetwork.prepareDeposit({
            currency: $scope.deposit_currency,
            amount: $scope.deposit_amount,
            note: $scope.deposit_note,
            return_url: $window.location.href
        }, function (data) {
            $window.location.href = data.result;
        });
    }

    $scope.send = function () {
        PaymentNetwork.sendPayment($scope.network_method.send, function (data) {
            console.log(data);
        });
    }

    /*PaymentNetwork.networks(function (response) {

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
        $scope.waitinggenerate = true;
        PaymentNetwork.newAccountAddress({ network: network_method.name }, function (response) {
            $scope.waitinggenerate = false;
            network_method.addresses = PaymentNetwork.accountAddresses({ network: network_method.name })
        });
    }

    $scope.withdraw_currency = userSession.user.currency_iso;

    $scope.withdraw = function (form, network, currency, amount, to_address, note) {
        $scope.waitingwithdraw = true;
        PaymentNetwork.sendPayment({network: network, currency: currency, amount: amount, to_address: to_address, note: note}, function (response) {
            $rootScope.reloadPayments = 'reloadpayments' +Math.random();
            $scope.waitingwithdraw = false;
            form.withdraw_note = '';
            form.withdraw_address = '';
            form.withdraw_amount = '';
            Msg.setResponseMessage('success', 'Payment sent to paypal account', response);
        }, function (response) {
            $rootScope.reloadPayments = 'reloadpayments' +Math.random();
            $scope.waitingwithdraw = false;
            Msg.setResponseMessage('error', 'Could not send payment', response);
        });
    }*/

    /*$scope.getAddresses = function (network) {
        return PaymentNetwork.accountAddresses({ network: network });
    }*/

});
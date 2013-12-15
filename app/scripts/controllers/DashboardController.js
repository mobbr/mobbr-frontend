'use strict';

angular.module('mobbr.controllers').controller('DashboardController', function ($scope, $rootScope, $timeout, Balances,userSession, Util, Dashboard, Msg, PaymentNetwork, $window, $routeParams, $location) {

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


    $scope.$rootScope = $rootScope;

    function resetLocation() {
        $timeout(function () {
            $window.location.href = $window.location.origin + '/' + $window.location.hash;
        }, 3000);
    }

    if ($window.location.search.indexOf('?transactionId=') !== -1) {
        PaymentNetwork.confirmDeposit({
                trx_id: $window.location.search.replace('?transactionId=', '')
            }, function (response) {
                Msg.setResponseMessage('info', response.message.text, response);
                resetLocation();
            }, function (response) {
                Msg.setResponseMessage('error', response.data.message.text, response);
                resetLocation();
            }
        );
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
        PaymentNetwork.sendPayment($scope.network_method.send, function (response) {
            $scope.network_method.send = {};
            Msg.setResponseMessage('info', response.message.text, response);
        }, function (response) {
            Msg.setResponseMessage('error', response.data.message.text, response);
        });
    }

    var getsupportedCurrencies = function(){
        PaymentNetwork.supportedCurrencies(function (response){
            $scope.supportedCurrencies = response.result;
        }, function (response){
            Msg.setResponseMessage('error', response.data.message.text, response);
        });
    }
    getsupportedCurrencies();



    $scope.generateAddress = function(currency){
        PaymentNetwork.newAccountAddress({'currency':currency},function(response){
           getsupportedCurrencies();
            if(response.message !== undefined && response.message !== null){
                Msg.setResponseMessage('info',response.message.text,response);
            }
        }, function (response){
            Msg.setResponseMessage('error', response.data.message.text, response);
        });
    }

//    PaymentNetwork.accountAddresses(function (response){
//       $scope.accountAddresses = response.address;
//    }, function(response){
//        Msg.setResponseMessage('error','could not load accountAddress');
//    });


});
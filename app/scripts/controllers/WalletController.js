'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $modal, $window, $location, MobbrBalance, MobbrXPayment, MobbrPayment) {

    if ($location.search().transactionId) {
        MobbrXPayment.confirmDeposit({
                trx_id: $location.search().transactionId
            },
            function () {
                $location.search('transactionId');
                reload();
            }
        );
    }

    function reload() {
        $scope.balances = MobbrBalance.user({}, function () {
            console.log($scope.balances);
        });
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

    $scope.newPayments = MobbrPayment.new();
    $scope.historicPayments = MobbrPayment.historic();

    $scope.openDepositDialog = function () {

        var depositDialog = $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/deposit_popup.html',
            controller: function ($scope) {

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

                $scope.deposit_currency = $scope.networks['iban'].default_currency;

                $scope.close = function () {
                    depositDialog.close();
                }

                $scope.confirm = function () {
                    $scope.waiting = true;
                    MobbrXPayment.prepareDeposit({
                        currency: $scope.deposit_currency,
                        amount: $scope.deposit_amount,
                        note: $scope.deposit_note,
                        return_url: $window.location.href
                    }, function (data) {
                        $scope.waiting = false;
                        depositDialog.close();
                        $window.location.href = data.result;
                    }, function(response){
                        $scope.waiting = false;
                    });
                }
            }
        });
    }

    $scope.openWithdrawDialog = function () {

        var withdrawDialog = $modal.open({
            backdrop: true,
            keyboard: true,
            backdropClick: false,
            templateUrl: 'views/partials/withdraw_popup.html',
            controller: function ($scope) {

                $scope.networks = {
                    btc: {
                        type: 'OTHER',
                        name: 'Bitcoin',
                        currencies: [ 'BTC' ],
                        default_currency: 'BTC'
                    },
                    iban: {
                        type: 'IBAN',
                        name: 'IBAN/BIC',
                        currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                        default_currency: 'EUR'
                    },
                    uk: {
                        type: 'GB',
                        name: 'GB',
                        currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                        default_currency: 'GBP'
                    },
                    us: {
                        type: 'US',
                        name: 'US',
                        currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                        default_currency: 'USD'
                    },
                    ca: {
                        type: 'CA',
                        name: 'Canada',
                        currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                        default_currency: 'USD'
                    },
                    other: {
                        type: 'OTHER',
                        name: 'Other',
                        currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                        default_currency: 'EUR'
                    }
                };

                $scope.deposit_currency = $scope.networks['iban'].default_currency;
                $scope.network_method = $scope.networks['iban'];

                $scope.$watch('network_method.name', function (oldval, newval) {
                    $scope.network_method.send = {
                        currency: $scope.network_method.default_currency,
                        address: {
                            type: $scope.network_method.type
                        }
                    };
                }, false);

                $scope.close = function () {
                    withdrawDialog.close();
                }

                $scope.confirm = function () {
                    $scope.waiting = true;
                    MobbrXPayment.withdraw($scope.network_method.send, function (response) {
                        $scope.waiting = false;
                        $scope.network_method.send = {};
                        withdrawDialog.close();
                        reload();
                    }, function (response) {
                        $scope.waiting = false;
                    });
                }
            }
        });
    }

    reload();
});
'use strict';

angular.module('mobbr.controllers').controller('WithdrawController', function ($scope, $state, $timeout, MobbrXPayment) {

    var feeTimeout;

    $scope.networks = {
        btc: {
            name: 'Bitcoin',
            currencies: [ 'BTC' ],
            send: {
                currency: 'BTC'
            }
        },
        iban: {
            name: 'IBAN/BIC',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            send: {
                currency: 'EUR',
                address: {
                    type: 'IBAN'
                }
            }
        },
        uk: {
            name: 'GB',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            send: {
                currency: 'GBP',
                address: {
                    type: 'GB'
                }
            }
        },
        us: {
            name: 'US',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            send: {
                currency: 'USD',
                address: {
                    type: 'US'
                }
            }
        },
        ca: {
            name: 'Canada',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            send: {
                currency: 'USD',
                address: {
                    type: 'CA'
                }
            }
        },
        other: {
            name: 'Other',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            send: {
                currency: 'EUR',
                address: {
                    type: 'OTHER'
                }
            }
        }
    };

    $scope.network_method = $scope.networks['iban'];

    $scope.confirm = function () {
        $scope.withdrawing = MobbrXPayment.withdraw($scope.network_method.send, function (response) {
            $state.go('^');
        });
    }

    $scope.getFee = function () {
        if ($scope.withdraw && $scope.withdraw.$valid) {
            $scope.fee = MobbrXPayment.withdrawFee($scope.network_method.send);
        }
    }

    $scope.$watch('network_method', function (oldValue, newValue) {
        feeTimeout && $timeout.cancel(feeTimeout);
        feeTimeout = $timeout($scope.getFee, 1000);
    }, true);
});


'use strict';

angular.module('mobbr.controllers').controller('WithdrawController', function ($scope, $modalInstance, MobbrXPayment) {

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
        $scope.waiting = true;
        MobbrXPayment.withdraw($scope.network_method.send, function (response) {
            $scope.waiting = false;
            $scope.network_method.send = {};
            $modalInstance.close();

        }, function (response) {
            $scope.waiting = false;
        });
    }
});


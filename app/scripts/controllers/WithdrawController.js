'use strict';

angular.module('mobbr.controllers').controller('WithdrawController', function ($scope, $modalInstance, MobbrXPayment) {

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


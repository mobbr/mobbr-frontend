'use strict';

angular.module('mobbr.controllers').controller('DepositController', function ($scope, $modalInstance, $window, MobbrXPayment) {

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

    $scope.confirm = function () {
        $scope.waiting = true;
        MobbrXPayment.prepareDeposit({
            currency: $scope.deposit_currency,
            amount: $scope.deposit_amount,
            note: $scope.deposit_note,
            return_url: $window.location.href
        }, function (data) {
            $scope.waiting = false;
            $modalInstance.close(data.result);
        }, function (response) {
            $scope.waiting = false;
        });
    }
});


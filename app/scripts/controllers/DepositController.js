'use strict';

angular.module('mobbr.controllers').controller('DepositController', function ($scope, $modalInstance, $window, MobbrXPayment) {

    $scope.networks = {
        btc: {
            type: 'btc',
            name: 'Bitcoin',
            currencies: [ 'BTC' ],
            currency: 'BTC'
        },
        bankwire: {
            type: 'bankwire',
            name: 'Bankwire',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            currency: 'EUR'
        },
        creditcard: {
            type: 'creditcard',
            name: 'Creditcard',
            currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
            currency: 'EUR'
        }
    };

    $scope.deposit_type = $scope.networks.creditcard;

    function loadCurrencies() {
        $scope.supportedCurrencies = MobbrXPayment.supportedCurrencies();
    }

    $scope.generateAddress = function (currency) {
        $scope.generating = MobbrXPayment.newAccountAddress({
                currency: currency
            },
            loadCurrencies
        );
    }

    loadCurrencies();

    $scope.confirm = function () {
        $scope.waiting = true;
        MobbrXPayment.deposit({
            type: $scope.deposit_type.type,
            currency: $scope.deposit_type.currency,
            amount: $scope.deposit_amount,
            note: $scope.deposit_note,
            return_url: $window.location.href
        }, function (data) {
            $scope.waiting = false;
            if (data.result.type === 'bankwire') {
                $scope.bankwire = data.result;
            }
            if (data.result.type === 'creditcard') {
                $window.location.href = data.result.url;
            }
        }, function (response) {
            $scope.waiting = false;
        });
    }
});

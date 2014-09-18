'use strict';

angular.module('mobbr.controllers').controller('DepositController', function ($scope, $state, $window, MobbrXPayment) {

    var popup_url, oauth_popup;

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

    function popupMessage(e) {
        if (e.data === 'oauth-popup') {
            oauth_popup.close();
            $window.removeEventListener('message', popupMessage);
            $state.go('wallet.x-payments');
        }
    }

    $scope.confirm = function () {

        if ($scope.deposit_type.type === 'creditcard') {

            popup_url = $window.location.origin + '/popup.html',
            oauth_popup = $window.open(popup_url, 'oauth-popup');
        }

        $scope.depositing = MobbrXPayment.deposit({
            type: $scope.deposit_type.type,
            currency: $scope.deposit_type.currency,
            amount: $scope.amount,
            note: $scope.note,
            return_url: popup_url
        }, function (data) {

            if (data.result.type === 'bankwire') {
                $scope.bankwire = data.result;
            }

            if (data.result.type === 'creditcard') {

                $window.addEventListener('message', popupMessage, false);
                oauth_popup.location.href = data.result.url;
            }
        }, function () {
            oauth_popup.close();
        });
    }
});


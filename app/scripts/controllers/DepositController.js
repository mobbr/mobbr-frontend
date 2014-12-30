'use strict';

angular.module('mobbr.controllers').controller('DepositController', function ($scope, $state, $stateParams, $window, $timeout, MobbrXPayment, addresses) {

    var popup_url, oauth_popup, feeTimeout;;

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
            $state.go('^', $stateParams, { reload: true });
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
            amount: $scope.deposit_type.amount,
            note: $scope.note,
            return_url: popup_url
        }, function (data) {

            if (data.result.type === 'bankwire') {
                $scope.bankwire = data.result;
                $window.ga('send', 'event', 'finance', 'deposit bankwire', 'amount', $scope.deposit_type.amount);
                $state.go($state.current, $stateParams, { reload: true });
            }

            if (data.result.type === 'creditcard') {
                $window.addEventListener('message', popupMessage, false);
                oauth_popup.location.href = data.result.url;
                $window.ga('send', 'event', 'finance', 'deposit creditcard', 'amount', $scope.deposit_type.amount);
            }
        }, function () {
            if ($scope.deposit_type.type === 'creditcard') {
                oauth_popup.close();
            }
            $window.ga('send', 'event', 'error', 'deposit bankwire', 'amount', $scope.deposit_type.amount);
        });
    }

    $scope.getFee = function () {
        if ($scope.deposit && $scope.deposit.$valid) {
            $scope.fee = MobbrXPayment.depositFee({
                type: $scope.deposit_type.type,
                currency: $scope.deposit_type.currency,
                amount: $scope.deposit_type.amount
            });
        }
    }

    $scope.$watch('deposit_type', function (oldValue, newValue) {
        feeTimeout && $timeout.cancel(feeTimeout);
        feeTimeout = $timeout($scope.getFee, 1000);
    }, true);

    $scope.supportedCurrencies = addresses;
});


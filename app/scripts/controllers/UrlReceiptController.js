'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, $stateParams, $rootScope, $window, $location, $state, MobbrBalance, MobbrPayment, MobbrPerson, mobbrSession, payment) {

    var urlParam = { url: $window.atob($stateParams.url) };

    if (payment.result.url !== urlParam.url) {
        console.log('redirect');
        var off = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            event.preventDefault();
           console.log(event);
        });
        $state.go('url', { url: $window.btoa(payment.result.url) });
        off();
    }

    function reload() {
        $scope.balances = MobbrBalance.uri(urlParam);
        $scope.personPayments = MobbrPayment.uri(urlParam);
        urlParam.base_currency = mobbrSession.isAuthorized() ? $rootScope.$mobbrStorage.user.currency_iso : 'EUR';
        $scope.earners = MobbrPerson.uri_earners(urlParam);
        $scope.payers = MobbrPerson.uri_payers(urlParam);
        delete urlParam.base_currency;
    }

    $scope.payment = payment;
    $scope.url = urlParam.url;
    $scope.onPayment = reload;

    reload();
});
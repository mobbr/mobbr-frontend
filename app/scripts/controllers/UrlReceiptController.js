'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, $stateParams, $rootScope, $window, $location,  MobbrBalance, MobbrPayment, MobbrPerson, mobbrSession, payment) {

    var urlParam = { url: $window.atob($stateParams.url) };

    if (!$stateParams.url) {
        $location.path('/url/' + $window.btoa($window.location.href));
    }

    if (payment.result.url !== urlParam.url) {
        $location.path('/url/' + $window.btoa(payment.result.url));
    }

    function reload() {
        $scope.balances = MobbrBalance.uri(urlParam);
        $scope.personPayments = MobbrPayment.uri(urlParam);
        urlParam.base_currency = mobbrSession.isAuthorized() ? $rootScope.$mobbrStorage.user.currency_iso : 'EUR';
        $scope.earners = MobbrPerson.uri_earners(urlParam);
        $scope.payers = MobbrPerson.uri_payers(urlParam);
        delete urlParam.base_currency;
    }

    console.log(payment);

    $scope.payment = payment;
    $scope.url = urlParam.url;
    $scope.onPayment = reload;

    reload();
});
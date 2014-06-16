'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, $stateParams, $rootScope, MobbrBalance, MobbrPayment, MobbrPerson, mobbrSession, $window, payment) {

    var urlParam = { url: $window.atob($stateParams.url) };

    if (!$stateParams.url) {
        $location.path('/url/' + $window.btoa($window.location.href));
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
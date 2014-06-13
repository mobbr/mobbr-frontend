'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, $stateParams, MobbrBalance, MobbrPayment, $window, payment) {

    var urlParam = { url: $window.atob($stateParams.url) };

    if (!$stateParams.url) {
        $location.path('/url/' + $window.btoa($window.location.href));
    }

    function reload() {
        $scope.balances = MobbrBalance.uri(urlParam);
        $scope.personPayments = MobbrPayment.uri(urlParam);
    }

    $scope.payment = payment;
    $scope.url = urlParam.url;
    $scope.onPayment = reload;

    reload();
});
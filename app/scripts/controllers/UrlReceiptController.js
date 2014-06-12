'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, MobbrPayment, MobbrReferrer, MobbrBalance, MobbrPerson, MobbrUri, $stateParams, $location, $window) {

    var urlParam, domainParam;

    if (!$stateParams.url) {
        $location.path('/url/' + $window.btoa(document.referrer));
    }

    urlParam = { url: $window.atob($stateParams.url) };
    $scope.url = urlParam.url;

    $scope.payment = MobbrPayment.preview({
            data: $window.atob($stateParams.url),
            referrer: document.referrer
        },
        function (response) {
            domainParam = { domain: response.result.url };
            $scope.locations = MobbrReferrer.domain(domainParam);
            $scope.divisions = MobbrPerson.domain(domainParam);
            $scope.hash = response.result.hash;
        }
    );

    $scope.onPayment = reload;

    function reload() {
        console.log($scope);
        $scope.balances = MobbrBalance.uri(urlParam);
        $scope.personPayments = MobbrUri.payments(urlParam);
    }

    reload();
});
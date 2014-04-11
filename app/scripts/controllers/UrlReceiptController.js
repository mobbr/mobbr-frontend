'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, MobbrPayment, MobbrReferrer, MobbrBalance, MobbrPerson, MobbrUri, $routeParams, $location, $window) {

    var urlParam, domainParam;

    if (!$routeParams.url) {
        $location.path('/url/' + $window.btoa(document.referrer)).replace();;
    }

    $scope.payment = MobbrPayment.preview({
            data: $window.atob($routeParams.url),
            referrer: document.referrer
        },
        function (response) {
            urlParam = { url: response.result.url };
            domainParam = { domain: response.result.url };
            $scope.balances = MobbrBalance.uri(urlParam);
            $scope.personPayments = MobbrUri.payments(urlParam);
            $scope.locations = MobbrReferrer.domain(domainParam);
            $scope.divisions = MobbrPerson.domain(domainParam);
        }
    );
});
'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, MobbrPayment, MobbrReferrer, MobbrBalance, MobbrPerson, MobbrUri, $routeParams, $location, $window, Msg) {

    var urlParam, domainParam;

    if (!$routeParams.url) {
        $location.path('/url/' + $window.btoa(document.referrer)).replace();;
    }

    $scope.payment = MobbrPayment.preview(
        {
            data: $window.atob($routeParams.url),
            referrer: document.referrer
        }, function (response) {
            if (response.result === null || response.result === undefined) {
                Msg.setResponseMessage('error', 'URL info not found', response);
            } else {
                urlParam = { url: response.result.url };
                domainParam = { domain: response.result.url };
                $scope.balances = MobbrBalance.uri(urlParam);
                $scope.personPayments = MobbrUri.payments(urlParam);
                $scope.locations = MobbrReferrer.domain(domainParam);
                $scope.divisions = MobbrPerson.domain(domainParam);

            }
        }, function (response) {
            Msg.setResponseMessage('error', 'URL info not found', response);
        }
    );
});
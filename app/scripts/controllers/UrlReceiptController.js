'use strict';

angular.module('mobbr.controllers').controller('UrlReceiptController', function ($scope, Url, Gateway, Domain, $routeParams, $location, $window, Msg) {

    var urlParam, domainParam;

    if (!$routeParams.url) {
        $location.path('/url/' + $window.btoa(document.referrer)).replace();;
    }

    $scope.payment = Gateway.analyzePayment(
        {
            data: $window.atob($routeParams.url),
            referrer: document.referrer
        }, function (response) {
            if (response.result === null || response.result === undefined) {
                Msg.setResponseMessage('error', 'URL info not found', response);
            } else {
                urlParam = { url: response.result.url };
                domainParam = { domain: response.result.url };
                $scope.balances = Url.balances(urlParam);
                $scope.personPayments = Url.personPayments(urlParam);
                $scope.locations = Domain.getLocations(domainParam);
                $scope.divisions = Domain.getPersons(domainParam);

            }
        }, function (response) {
            Msg.setResponseMessage('error', 'URL info not found', response);
        }
    );
});
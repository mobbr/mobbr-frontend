'use strict';

angular.module('mobbr.controllers').controller('DomainController', function ($scope, MobbrDomain, MobbrPerson, MobbrPayment, MobbrBalance, MobbrReferrer, Msg, $location, $routeParams, $window) {

    var refarray,
        urlParam;

    if (!$routeParams.url) {
        refarray = document.referrer.split('/');
        $location.path('/domain/' + $window.btoa(refarray[0] + '//' + refarray[2]));
    }

    urlParam = { domain: $window.atob($routeParams.url) };
    $scope.balances = MobbrBalance.domain(urlParam);
    $scope.info = MobbrDomain.info(urlParam);
    $scope.locations = MobbrReferrer.domain(urlParam);
    $scope.persons = MobbrPerson.domain(urlParam);
    $scope.unclaimed = MobbrPayment.unclaimed(urlParam);
    $scope.payments = MobbrPayment.domain(
        urlParam,
        function (response) {
            if (response.result === null) {
                Msg.setResponseMessage( 'error', 'Could not get payments', response);
            }
        }, function (response) {
            Msg.setResponseMessage( 'error', 'Could not get payments', response);
        }
    );
});
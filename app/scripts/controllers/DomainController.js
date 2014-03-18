'use strict';

angular.module('mobbr.controllers').controller('DomainController', function ($scope, Domain ,Msg, $location, $routeParams, $window) {

    var refarray,
        urlParam;

    if (!$routeParams.url) {
        refarray = document.referrer.split('/');
        $location.path('/domain/' + $window.btoa(refarray[0] + '//' + refarray[2]));
    }

    urlParam = { domain: $window.atob($routeParams.url) };
    $scope.balances = Domain.balances(urlParam);
    $scope.info = Domain.info(urlParam);
    $scope.locations = Domain.getLocations(urlParam);
    $scope.persons = Domain.getPersons(urlParam);
    $scope.unclaimed = Domain.getUnclaimed(urlParam);
    $scope.payments = Domain.getPayments(
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
'use strict';

angular.module('mobbr.controllers').controller('DomainController', function ($scope, $routeParams, $window, MobbrDomain, MobbrPerson, MobbrPayment, MobbrBalance, MobbrReferrer) {

    var urlParam = { domain: $window.atob($routeParams.url) };

    $scope.balances = MobbrBalance.domain(urlParam);
    $scope.info = MobbrDomain.info(urlParam);
    $scope.locations = MobbrReferrer.domain(urlParam);
    $scope.persons = MobbrPerson.domain(urlParam);
    $scope.unclaimed = MobbrPayment.unclaimed(urlParam);
    $scope.payments = MobbrPayment.domain(urlParam);
});
'use strict';

angular.module('mobbr.controllers').controller('DomainController', function ($scope, $stateParams, $window, MobbrDomain, MobbrPerson, MobbrPayment, MobbrBalance, MobbrReferrer, MobbrUri) {

    var urlParam = { domain: $window.atob($stateParams.url) };

    $scope.balances = MobbrBalance.domain(urlParam);
    $scope.info = MobbrDomain.info(urlParam);
    $scope.locations = MobbrReferrer.domain(urlParam);
    $scope.persons = MobbrPerson.domain(urlParam);
    $scope.unclaimed = MobbrUri.unclaimed(urlParam);
    $scope.payments = MobbrPayment.domain(urlParam);
});
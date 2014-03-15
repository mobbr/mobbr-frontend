'use strict';

angular.module('mobbr.controllers').controller('SourcingController', function ($scope, Sourcing) {

    Sourcing.urls(function (response) {
        console.log(response.result);
    });

    $scope.persons = Sourcing.persons();
});
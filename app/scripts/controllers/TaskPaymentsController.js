'use strict';

angular.module('mobbr.controllers').controller('TaskPaymentsController', function ($scope, $window, $state, MobbrPayment) {

    $scope.payments = MobbrPayment.uri({
        url: $window.atob($state.params.task)
    });
});
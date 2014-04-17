'use strict';

angular.module('mobbr.controllers').controller('MobbrNowController', function ($scope, $window) {

    $scope.submit = function () {
        if ($scope.mobbrnowInput) {
            $window.mobbr.makePayment($scope.mobbrnowInput);
        }
    }
});
'use strict';

angular.module('mobbr.controllers')
    .controller('MobbrNowController', function ($scope) {

        $scope.submit = function () {
            if ($scope.mobbrnowInput) {
                mobbr.makePayment($scope.mobbrnowInput);
            }
        }
    }
);
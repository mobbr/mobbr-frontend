'use strict';

angular.module('mobbr.directives').directive('mobbrPayment', function ($window, $rootScope, MobbrPayment, mobbrSession) {

    return {
        restrict: 'E',
        replace: true,
        transclude:true,
        templateUrl: 'views/directives/mobbrPayment.html',
        scope: {
            hash: '=',
            type: '=',
            onPayment: '='
        },
        controller: function ($scope) {

            $scope.labels = {
                pledge: 'Pledge',
                donate: 'Donate'
            };

            $scope.mobbrSession = mobbrSession;
            $scope.$rootScope = $rootScope;
            $scope.currency = mobbrSession.isAuthorized() ? $rootScope.$mobbrStorage.user.currency_iso : 'EUR';

            $scope.makePayment = function () {
                $scope.payment = MobbrPayment.confirm({
                    referrer: $window.location.href,
                    currency: $scope.currency.currency_iso,
                    amount: $scope.amount,
                    hash: $scope.hash
                }, function () {
                    $scope.onPayment();
                });
            }
        }
    }
})
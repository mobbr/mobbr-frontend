angular.module('mobbr.controllers').controller('UpdatesController', function ($scope, $q, MobbrNotifications, MobbrBalance) {
    'use strict';


    $scope.dashboard = {};

    function parseIds() {
        $scope.parsedIds = [];
        angular.forEach($scope.oAuthProviders, function (providerObj) {
            angular.forEach($scope.$mobbrStorage.user.id, function (id) {
                if (id.indexOf(providerObj.host) > -1) {
                    $scope.parsedIds.push(providerObj);
                }
            });
        });
    }

    $scope.$watch('$mobbrStorage.user.id', function () {
        if ($scope.oAuthProviders && $scope.oAuthProviders.length > 0) {
            parseIds();
        } else {
            $q.when($scope.oAuthProviders).then(function () {
                if ($scope.$mobbrStorage.user && $scope.$mobbrStorage.user.id) {
                    parseIds();
                }
            });
        }
    });

    function refreshNotifications() {
        $scope.notifications = MobbrNotifications.user(function (response) {
            $scope.notifications = response.result;

        });
    }

    refreshNotifications();

    $scope.deleteAll = function () {
        MobbrNotifications.delete().then(function () {
            refreshNotifications();
        });
    };

    MobbrBalance.user(function (response) {
        if(response && response.result){
            $scope.dashboard.total_currency_iso = response.result.total_currency_iso;
            $scope.dashboard.total_amount = response.result.total_amount;
        }
    });

});

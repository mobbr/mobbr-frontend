angular.module('mobbr.controllers').controller('UpdatesController', function ($scope, $q, $rootScope, notifications, balance, person, MobbrNotifications) {
    'use strict';

    var profileFields = [
        'firstname',
        'lastname',
        'birthday',
        'address',
        'country_of_residence',
        'nationality', 'occupation',
        'income_range',
        'companyname',
        'vat_number',
        'currency_iso',
        'language_iso',
        'timezone'
    ];

    $scope.dashboard = balance.result;
    $scope.notifications = notifications;
    $scope.person = person;

    function parseIds() {
        $scope.parsedIds = [];
        angular.forEach($scope.oAuthProviders.result, function (providerObj) {
            angular.forEach($scope.$mobbrStorage.user.id, function (id) {
                providerObj.active = providerObj.active || (providerObj && id.indexOf(providerObj.host) > -1);
            });
            $scope.parsedIds.push(providerObj);
        });
    }

    $scope.$watch('$mobbrStorage.user.id', function () {
        if ($scope.oAuthProviders && $scope.oAuthProviders.$resolved) {
            parseIds();
        } else {
            $q.when($scope.oAuthProviders).then(function () {
                if ($scope.$mobbrStorage.user && $scope.$mobbrStorage.user.id) {
                    parseIds();
                }
            });
        }
    });

    var countFields = function (fields) {
        var count = 0;
        if ($scope.$mobbrStorage.user) {
            angular.forEach(fields, function (field) {
                if ($scope.$mobbrStorage.user[field]) {
                    count = count + 1;
                }
            });
        }

        return count;
    };

    $scope.countProfileCompleted = function () {

        var count = countFields(profileFields);

        if ($scope.$mobbrStorage.user.mangopay_identity_proof === 'VALIDATION_ASKED' || $scope.$mobbrStorage.user.kyc_level === 'regular') {
            count++;
        }

        return count / 14;
    };

    $scope.updates = { open: true };

});

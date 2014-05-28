'use strict';

angular.module('mobbr.controllers').controller('UpdateEmailController', function ($scope, $location, $stateParams, MobbrUser) {

    MobbrUser.confirmEmail({
            update_token: $stateParams.hash
        },
        function (response) {
            $location.path('/settings');
        }
    );
});
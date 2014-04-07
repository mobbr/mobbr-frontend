'use strict';

angular.module('mobbr.controllers').controller('UpdateEmailController', function ($scope, $location, $routeParams, MobbrUser, Msg) {

    MobbrUser.confirmEmail({
            update_token: $routeParams.hash
        },
        function (response) {
            Msg.setResponseMessage('info', 'Updated your email address', response);
            $location.path('/settings');
        },
        function (response) {
            Msg.setResponseMessage('error', 'Could not update your email address', response);
        }
    );
});
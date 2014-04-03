'use strict';

angular.module('mobbr.controllers').controller('ResetPasswordController', function ($scope, $route, MobbrUser, userSession, Msg) {

    $scope.username_or_email = '';

    $scope.recoverPassword = function () {
        $scope.waiting = true;
        MobbrUser.sendLoginLink({
                username_or_email: $scope.username_or_email
            },
            function (response) {
                $scope.waiting = false;
                Msg.setResponseMessage('info', 'A email has been sent to you', response);

            },
            function (response) {
                $scope.waiting = false;
                Msg.setResponseMessage('error', 'Could not recover password', response);
            }
        );
    }

});

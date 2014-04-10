'use strict';


angular.module('mobbr.controllers').controller('ResetPasswordController', function ($scope, $route, User, userSession, Msg) {

    $scope.username_or_email = '';


    $scope.recoverPassword = function () {
        $scope.waiting = false;
        if ($scope.username_or_email.length < 1 && $scope.username_or_email.length < 1) {
            Msg.addWarning('Only Enter username or email to recover password');
        }
        else {
            $scope.waiting = true;
            User.recover({'username_or_email': $scope.username_or_email},
                function (response) {
                    $scope.waiting = false;
                    Msg.setResponseMessage('info', 'A email has been sent to you', response);

                },
                function (response) {
                    $scope.waiting = false;
                    Msg.setResponseMessage('error', 'Could not recover password', response);
                });

        }
    }

});

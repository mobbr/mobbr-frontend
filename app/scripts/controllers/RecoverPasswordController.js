'use strict';

angular.module('mobbr.controllers').controller('ResetPasswordController', function ($scope, MobbrUser) {

    $scope.recoverPassword = function () {
        $scope.recovering = MobbrUser.sendLoginLink({ username_or_email_or_id: $scope.username_or_email });
    }
});

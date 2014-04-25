'use strict';

angular.module('mobbr.controllers').controller('ResetPasswordController', function ($scope, $route, MobbrUser) {

    $scope.recoverPassword = function () {
        $scope.recovering = MobbrUser.sendLoginLink({ username_or_email: $scope.username_or_email });
    }
});

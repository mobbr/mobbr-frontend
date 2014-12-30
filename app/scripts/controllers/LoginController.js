'use strict';

angular.module('mobbr.controllers').controller('LoginController', function ($scope, $window, $state, MobbrUser) {

    $scope.loginuser = function () {
        $scope.authenticating = MobbrUser.passwordLogin({ username: $scope.username, password: $scope.password });
    };
});

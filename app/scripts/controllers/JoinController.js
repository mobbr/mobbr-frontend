'use strict';

angular.module('mobbr.controllers').controller('JoinController', function ($scope, $stateParams, $window, MobbrUser) {

    $scope.waiting = false;
    $scope.email = $stateParams.email;
    $scope.registerUser = function () {

        $scope.waiting = true;

        MobbrUser.register({
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            password_control: $scope.password_control
        }, function (response) {
            $window.ga('send', 'event', 'account', 'register', 'username', $scope.username);
            $scope.waiting = false;
            $scope.email = '';
            $scope.username = '';
            $scope.password = '';
            $scope.password_control = '';
        }, function (response) {
            $window.ga('send', 'event', 'error', 'register', 'username', $scope.username);
            $scope.waiting = false;
        });
    }
});

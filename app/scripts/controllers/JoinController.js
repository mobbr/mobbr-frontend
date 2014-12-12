'use strict';

angular.module('mobbr.controllers').controller('JoinController', function ($scope, $window, MobbrUser, mobbrMsg) {

    $scope.registerUser = function () {
        if (!$scope.register.$invalid) {
            $scope.registering = MobbrUser.register({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password
            }, function () {
                $window.ga('send', 'event', 'account', 'register', 'username', $scope.username);
                $scope.email = '';
                $scope.username = '';
                $scope.password = '';
                $scope.password_control = '';
            }, function () {
                $window.ga('send', 'event', 'error', 'register', 'username', $scope.username);
            });
        } else {
            mobbrMsg.add({ msg: 'Make sure the passwords match', type: 'danger' });
        }
    }
});

'use strict';

angular.module('mobbr.controllers').controller('JoinController', function ($scope, $stateParams, MobbrUser) {

    $scope.waiting = false;
    $scope.email = $stateParams.email;
    $scope.registerUser = function (username, email, password, password_control) {

        $scope.waiting = true;

        MobbrUser.register({
            username: username,
            email: email,
            password: password,
            password_control: password_control
        }, function (response) {
            $scope.waiting = false;
            $scope.email = '';
            $scope.username = '';
            $scope.password = '';
            $scope.password_control = '';
        }, function (response) {
            $scope.waiting = false;
        });
    }
});

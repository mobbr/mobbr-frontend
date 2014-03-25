'use strict';


angular.module('mobbr.controllers').controller('JoinController', function ($scope, $routeParams, User, Msg) {

    $scope.waiting = false;
    $scope.email = $routeParams.email;
    $scope.registerUser = function () {
        var user = {'email': $scope.email, 'username': $scope.username, 'password': $scope.password, 'password_control': $scope.password_control};
        $scope.waiting = true;

        User.register(user, function (response) {
            Msg.setResponseMessage('info', '', response);
            $scope.waiting = false;
            $scope.email = '';
            $scope.username = '';
            $scope.password = '';
            $scope.password_control = '';
        }, function (response) {
            Msg.setResponseMessage('error', 'Couldn\'t send information', response);
            $scope.waiting = false;
        });
    }
});

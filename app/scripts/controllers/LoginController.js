'use strict';


angular.module('mobbr.controllers').controller('LoginController', function ($scope, $route, MobbrUser, userSession, Msg, $location, $http, $routeParams) {

    setTimeout(function () {
        $scope.$apply(function () {
            $('input[ng-model]').trigger('change');
        });
    }, 250);

    $scope.login = function (redirect) {
        redirect = redirect === undefined && true || redirect;
        $scope.waiting = true;
        MobbrUser.passwordLogin({ email: $scope.email, password: $scope.password }, function (response) {

            $scope.waiting = false;
            if (response.result != undefined && response.result != null) {

                userSession.doLogin(response.result);

                Msg.setResponseMessage('info', 'Login successful', response);

                if (userSession.redirectAfterLogin != null && userSession.redirectAfterLoginIn != null && userSession.redirectAfterLoginIn > new Date().getTime()) {

                    $location.path(userSession.redirectAfterLogin);

                    userSession.redirectAfterLoginIn = null;

                } else if (redirect) {
                    $location.path('/wallet');
                }


            } else {
                Msg.setResponseMessage('info', 'Could not log you in', response);

                userSession.authenticated = false;
                userSession.user = {};

                $route.reload();
            }

        }, function (response) {
            $scope.waiting = false;
            Msg.setResponseMessage('error', 'Could not log you in', response);
        });
    }

    $scope.logout = function () {

        MobbrUser.logout({'session_token': $http.defaults.headers.common['Authorization']}, function (response) {

            Msg.setResponseMessage('info', 'Logged you out', response);

        }, function (response) {

            Msg.setResponseMessage('info', 'Logged you out', response);

        });

        // Clear basic authentication header
        userSession.doLogout();

        $location.path('/');

    }

    $scope.resetPassword = function () {

        $scope.waiting = true;

        MobbrUser.updatePassword({'session_token': $routeParams.hash, password: $scope.new_password, password_control: $scope.new_password_control},
            function (response) {
                $scope.waiting = false;
                if (response.result != null) {

                    Msg.setResponseMessage('info', 'Updated password, logging you in', response);

                    userSession.doLogin(response.result);

                    $scope.new_password = '';

                    $location.path('/wallet');
                } else {
                    Msg.setResponseMessage('info', 'Could not log you in', response);
                }
            },
            function (response) {
                $scope.waiting = false;
                Msg.setResponseMessage('error', 'could not log you in', response);
            });
    }


});

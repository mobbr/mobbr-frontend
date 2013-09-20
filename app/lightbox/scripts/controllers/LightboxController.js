'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, $timeout, Gateway, userSession, User) {

        var hash,
            error,
            dologin,
            logout,
            logintimeout;

        function check() {

            error = $location.search()['error'];
            hash = $location.search()['hash'];
            dologin = $location.search()['login'];
            logout = $location.search()['logout'];
            $scope.loginerror = false;

            if (error) {
                $scope.dologin = false;
                $scope.loading = false;
                $scope.errormessage = error;
                $scope.marked = false;
            } else if (hash) {
                $scope.dologin = false;
                Gateway.getPayment({ hash: hash }, function (response) {
                    $scope.json = response.result;
                    $scope.noscript = $scope.json['participants'] === undefined || $scope.json['participants'].length === 0;
                    $scope.loading = false;
                });
            } else if (login) {
                $scope.dologin = true;
                $scope.loading = false;
            } else if (logout) {
                userSession.doLogout(true);
            } else {
                $scope.dologin = false;
                $scope.loading = true;
                $scope.marked = undefined;
                $scope.json = undefined;
                $scope.noscript = undefined;
            }
        }

        function register() {
            Gateway.registerPayment({ referrer: document.referrer || 'http://zaplog.nl', hash: hash }, function (response) {
                $scope.marked = true;
            }, function (response) {
                $scope.errormessage = response.data && response.data.message && response.data.message.text;
                $scope.marked = false;
            });
        }

        $scope.$on('$locationChangeSuccess', check);

        $scope.registerPayment = function (data) {
            if (!userSession.authenticated) {
                $scope.login(data, false, true);
            } else {
                register();
            }
        }

        $scope.login = function (data, notifyParent, do_register) {
            User.login({ email: data.email.$modelValue, password: data.password.$modelValue }, function (response) {
                if (response.result != undefined && response.result != null) {
                    userSession.doLogin(response.result, notifyParent);
                    do_register && register();
                }
            }, function (response) {
                $scope.loginerror = true;
                $timeout.cancel(logintimeout);
                logintimeout = $timeout(function () {
                    $scope.loginerror = undefined;
                }, 5000);
            });
        }

        $scope.userSession = userSession;
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);

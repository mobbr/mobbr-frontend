'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, $timeout, Gateway, userSession, User) {

        var hash,
            error,
            logintimeout;

        function check() {
            error = $location.search()['error'];
            hash = $location.search()['hash'];
            if (error) {
                $scope.loading = false;
                $scope.errormessage = error;
                $scope.marked = false;
            } else if (hash) {
                Gateway.getPayment({ hash: hash }, function (response) {
                    $scope.json = response.result;
                    $scope.noscript = $scope.json['participants'] === undefined || $scope.json['participants'].length === 0;
                    $scope.loading = false;
                });
            } else {
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
                User.login({ email: data.email.$modelValue, password: data.password.$modelValue }, function (response) {
                    if (response.result != undefined && response.result != null) {
                        userSession.doLogin(response.result);
                        register();
                    }
                }, function (response) {
                    $scope.loginerror = true;
                    $timeout.cancel(logintimeout);
                    logintimeout = $timeout(function () {
                        $scope.loginerror = undefined;
                    }, 5000);
                });
            } else {
                register();
            }
        }

        $scope.userSession = userSession;
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);

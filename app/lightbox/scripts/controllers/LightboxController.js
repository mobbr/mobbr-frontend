'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, $timeout, Gateway, Url, userSession, User) {

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
                Url.fullData({ url: 'https://mobbr.com' /*'http://fmt.mobbr.com/3/programmas-documentaires-mogen-ontbreken-innovation-station'*/ /*document.referrer*/ }, function (response) {
                    $scope.urlData = response.result;
                    $scope.noscript = $scope.urlData['participants'] === undefined || $scope.urlData['participants'].length === 0;
                    $scope.loading = false;
                    console.log($scope.urlData);
                });
            } else if (dologin) {
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

        $scope.loading = true;
        $scope.userSession = userSession;
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);

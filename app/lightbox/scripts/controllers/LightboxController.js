'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, $timeout, Gateway, Url, userSession, User, Balances) {

        var hash,
            error,
            dologin,
            logout,
            logintimeout,
            customtimeout;

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
                Gateway.analyzePayment({ data: window.atob(hash), referrer: document.referrer }, function (response) {
                    hash = response.result;
                    Url.fullData({ hash: hash }, function (response) {
                        $scope.urlData = response.result;
                        $scope.noscript = $scope.urlData['participants'] === undefined || $scope.urlData['participants'].length === 0;
                        $scope.noparticipants = $scope.urlData['participants'] === undefined || $scope.urlData['participants'].length === 0
                        $scope.loading = false;
                    });
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

            checkLogin();
        }

        function checkLogin() {
            if (userSession.authenticated) {
                Balances.balance(function (response) {
                    $scope.userCurrencies = response.result;
                    $scope.currency = $scope.userCurrencies[0];
                });
            }
        }

        function register() {
            Gateway.registerPayment({ referrer: document.referrer || 'http://zaplog.nl', hash: hash }, function (response) {
                $scope.marked = true;
                $scope.laterpaying = undefined;
            }, function (response) {
                $scope.errormessage = response.data && response.data.message && response.data.message.text;
                $scope.marked = false;
                $scope.laterpaying = undefined;
            });
        }

        function perform() {
            var currency = $scope.currency && $scope.currency.currency_iso || $scope.currency;
            Gateway.performPayment({
                referrer: document.referrer || 'http://zaplog.nl',
                currency: currency,
                amount: $scope.amount,
                hash: hash
            }, function (response) {
                $scope.marked = true;
                $scope.nowpaying = undefined;
            }, function (response) {
                $scope.customerror = response.data.message.text;
                $scope.nowpaying = undefined;
                $timeout.cancel(logintimeout);
                customtimeout = $timeout(function () {
                    $scope.customerror = undefined;
                }, 5000);
            });
        }

        $scope.$on('$locationChangeSuccess', check);

        $scope.registerPayment = function (data) {
            $scope.laterpaying = true;
            if (!userSession.authenticated) {
                $scope.login(data, false, true);
            } else {
                register();
            }
        }

        $scope.performPayment = function (data) {
            $scope.nowpaying = true;
            console.log($scope.nowpaying);
            if (!userSession.authenticated) {
                $scope.login(data, false, false, true);
            } else {
                perform();
            }
        }

        $scope.login = function (data, notifyParent, do_register, do_perform) {
            User.login({ email: data.email.$modelValue, password: data.password.$modelValue }, function (response) {
                if (response.result != undefined && response.result != null) {
                    userSession.doLogin(response.result, notifyParent);
                    do_register && register();
                    do_perform && perform();
                    checkLogin();
                }
            }, function (response) {
                $scope.loginerror = true;
                $timeout.cancel(logintimeout);
                logintimeout = $timeout(function () {
                    $scope.loginerror = undefined;
                }, 5000);
            });
        }

        $scope.currency = userSession.currency_iso;
        $scope.loading = true;
        $scope.userSession = userSession;
        //$scope.same_domain = strcmp( parse_url( $json['url'], PHP_URL_HOST), parse_url( $referrer, PHP_URL_HOST) ) == 0;
    }
);

'use strict';

angular.module('mobbr.controllers')
    .controller('LightboxController', function ($scope, $location, $timeout, $rootScope, MobbrPayment, MobbrUser, MobbrBalance, MobbrPerson) {

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
                MobbrPayment.preview({ data: window.atob(hash), referrer: document.referrer }, function (response) {
                    hash = response.result.hash;
                    $scope.urlData = response.result;
                    $scope.noscript = $scope.urlData.script['.scripts_found'] === undefined || $scope.urlData.script['.scripts_found'].length === 0;
                    $scope.noparticipants = $scope.urlData.script['participants'] === undefined || $scope.urlData.script['participants'].length === 0;
                    $scope.loading = false;
                    $scope.persons = MobbrPerson.url({ url: response.result.url });
                    $scope.balances = MobbrBalance.uri({ url: response.result.url });
                }, function (response) {
                    $scope.errormessage = response.data && response.data.message && response.data.message.text;
                    $scope.marked = false;
                    $scope.loading = false;
                });

            } else if (dologin) {
                $scope.dologin = true;
                $scope.loading = false;
            } else if (logout) {
                $rootScope.logout();
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
            if ($rootScope.$mobbrStorage.token) {
                MobbrBalance.user(function (response) {
                    $scope.userCurrencies = response.result;
                    $scope.currency = $scope.userCurrencies[0];
                });
            } else {
                $scope.currency = 'EUR';
            }
        }

        function perform() {
            var currency = $scope.currency && $scope.currency.currency_iso || $scope.currency;
            MobbrPayment.confirm({
                referrer: document.referrer,
                currency: currency,
                amount: $scope.amount,
                hash: hash
            }, function (response) {
                $scope.marked = true;
                $scope.nowpaying = undefined;
                $scope.nowpayed = true;
                $scope.laterpayed = undefined;
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
            if (!$rootScope.$mobbrStorage.token) {
                $scope.login(data, false, true);
            } else {
                register();
            }
        }

        $scope.performPayment = function (data) {
            $scope.nowpaying = true;
            if (!$rootScope.$mobbrStorage.token) {
                $scope.login(data, false, false, true);
            } else {
                perform();
            }
        }

        $scope.login = function (data, notifyParent, do_register, do_perform) {
            MobbrUser.login({ email: data.email.$modelValue, password: data.password.$modelValue }, function (response) {
                if (response.result != undefined && response.result != null) {
                    do_register && register();
                    do_perform && perform();
                    checkLogin();
                }
            }, function (response) {
                $scope.loginerror = true;
                $scope.laterpaying = undefined;
                $scope.nowpaying = undefined;
            });
        }

        $scope.currency = $rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.currency_iso || 'EUR';
        $scope.loading = true;
    }
);

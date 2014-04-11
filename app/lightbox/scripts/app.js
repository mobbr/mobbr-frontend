'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);
angular.module('mobbr.filters', []);
angular.module('mobbr.configuration', []);

angular.module('mobbr-lightbox', [

        'mobbrApi',
        'mobbrMsg',
        'mobbrSession',
        'ngRoute',
        'ui.bootstrap',
        'mobbr.config',
        'mobbr.directives',
        'mobbr.controllers',
        'mobbr.filters'

    ]).run(function ($http, $rootScope, $route, $location, $window, MobbrApi, MobbrUser) {

        $rootScope.login = function (email, password) {
            MobbrUser.passwordLogin({ email: email, password: password }, function () {
                $location.path('/wallet');
            });
        };

        $rootScope.logout = function () {
            MobbrUser.logout();
        }

        $rootScope.$on('mobbrApi:authchange', function (user) {
            $route.reload();
            if ($window.parent && $window.parent.postMessage) {
                $window.parent.postMessage(user && [ user.username, user.email ].join('|') || 'logout', '*');
            }
        });

        $rootScope.isTest = function () {
            return window.location.href.search('test-www.mobbr.com');
        }

        $rootScope.currenciesMap = {};
        MobbrApi.forexCurrencies(function (response) {
            if (response.result != null) {
                $rootScope.currenciesMap = response.result;
            } else if (response.message != null) {
                console.log('error loading currencies' + response.error.status);
            }
            $rootScope.currenciesMap['MBR'] = 'Mobbr';
        });
    }
);
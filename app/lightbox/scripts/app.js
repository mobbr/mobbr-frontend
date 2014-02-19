'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);
angular.module('mobbr.filters', []);

angular.module('mobbr-lightbox', [

        'ui.bootstrap',
        'mobbr.directives',
        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.mbr-api',
        'mobbr.services.storage',
        'mobbr.services.user',
        'mobbr.filters'

    ]).run([

        '$http',
        '$rootScope',
        'Util',
        function ($http, $rootScope, Util) {

            $rootScope.isTest = function () {
                return window.location.href.search('test-www.mobbr.com');
            }

            $rootScope.currenciesMap = {};
            Util.currencies(function (response) {
                if (response.result != null) {
                    $rootScope.currenciesMap = response.result;
                } else if (response.message != null) {
                    console.log('error loading currencies' + response.error.status);
                }
                $rootScope.currenciesMap['MBR'] = 'Mobbr';
            });
        }
    ]).config([

        '$httpProvider',
        function ($httpProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ]
);
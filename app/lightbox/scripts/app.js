'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);

angular.module('mobbr-lightbox', [
        'ui.bootstrap',
        'mobbr.directives',
        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.mbr-api',
        'mobbr.services.storage',
        'mobbr.services.user'
    ]).run([

        '$http',
        '$rootScope',
        'Util',
        '$location',
        'userSession',
        'Msg',
        '$window',
        '$anchorScroll',
        '$routeParams',
        function ($http, $rootScope, Util) {

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
    ]
);
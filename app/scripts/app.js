'use strict';

angular.module('mobbr.controllers', []);

angular.module('mobbr', [

        'ui.bootstrap',
        'mobbr.controllers',
        'mobbr.services.msg',
        'mobbr.services.mbr-api',
        'mobbr.services.user',
        'mobbr.services.storage',
        'mobbr.directives',
        'ngCookies'

    ]).config([

        '$routeProvider',
        function ($routeProvider) {

            var resolver = {
                authResolver: [
                    '$q',
                    'userSession',
                    function ($q, userSession) {

                        var authenticated = userSession.authenticate(),
                            deferred = $q.defer();

                        authenticated && deferred.resolve() || deferred.reject();

                        return deferred.promise;
                    }
                ]
            }

            $routeProvider.when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainController'
                }).when('/main_new', {
                    templateUrl: 'views/main_new.html'
                }).when('/login/:hash', {
                    templateUrl: 'views/link-login.html',
                    controller: 'LinkLoginController',
                    authsettings: { authenticated: false, redirectTo: '/dashboard' },
                    resolve: resolver
                }).when('/activate/:hash', {
                    templateUrl: 'views/activate.html',
                    controller: 'ActivateController',
                    authsettings: { authenticated: false, redirectTo: '/dashboard' },
                    resolve: resolver
                }).when('/email/:hash', {
                    templateUrl: 'views/update-email.html',
                    controller: 'UpdateEmailController'
                }).when('/recover', {
                    templateUrl: 'views/recover-password.html',
                    controller: 'ResetPasswordController',
                    authsettings: { authenticated: false, redirectTo: '/dashboard' },
                    resolve: resolver
                }).when('/join', {
                    templateUrl: 'views/join.html',
                    controller: 'JoinController',
                    authsettings: { authenticated: false, redirectTo: '/dashboard' },
                    resolve: resolver
                }).when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'UserSettingsController',
                    authsettings: { authenticated: true, redirectTo: '/' },
                    resolve: resolver
                }).when('/dashboard', {
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardController',
                    authsettings: { authenticated: true, redirectTo: '/' },
                    resolve: resolver
                }).when('/domain/:url', {
                    templateUrl: 'views/domain.html',
                    controller: 'DomainController'
                }).when('/claimpayment', {
                    templateUrl: 'views/claim_payment.html',
                    controller: 'ClaimPaymentController'
                }).when('/generatebutton', {
                    templateUrl: 'views/generate_button.html',
                    controller: 'CreateButtonController'
                }).when('/exchangerate', {
                    templateUrl: 'views/exchangerate.html',
                    controller: 'ExchangerateController'
                }).when('/buttons', {
                    templateUrl: 'views/buttons.html'
                }).when('/api', {
                    templateUrl: 'views/api.html'
                }).when('/usecases', {
                    templateUrl: 'views/usecases.html'
                }).when('/siteconnector', {
                    templateUrl: 'views/siteconnector.html'
                }).when('/consumers', {
                    templateUrl: 'views/consumers.html'
                }).when('/webmasters', {
                    templateUrl: 'views/webmasters.html'
                }).when('/creators', {
                    templateUrl: 'views/creators.html'
                }).when('/company', {
                    templateUrl: 'views/company.html'
                }).when('/partnering', {
                    templateUrl: 'views/partnering.html'
                }).when('/validator', {
                    templateUrl: 'views/validator.html'
                }).when('/payment/:id', {
                    templateUrl: 'views/payment.html',
                    controller: 'PaymentReceiptController'
                }).when('/url/:url', {
                    templateUrl: 'views/url.html',
                    controller: 'UrlReceiptController'
                }).otherwise({
                    redirectTo: '/'
                }
            );
        }
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
        function ($http,$rootScope, Util, $location, userSession, Msg, $window, $anchorScroll, $routeParams) {

            // TODO: check what code should actually be here and move everything else to the services they belong to

            $rootScope.currenciesMap = {};
            Util.currencies(function (response) {
                if (response.result != null) {
                    $rootScope.currenciesMap = response.result;
                } else if (response.message != null) {
                    console.log('error loading currencies' + response.error.status);
                }
                $rootScope.currenciesMap['MBR'] = 'Mobbr';
            });

            $rootScope.currencyDescription = function (iso) {
                var currency = $rootScope.currenciesMap[iso];
                if (!currency || 0 === currency.length) {
                    return iso;
                }
                return currency;
            }

            Util.languages(function (response) {
                if (response.result != null) {
                    $rootScope.languagesMap = response.result;
                    $rootScope.languagesMap[''] = 'No language';
                }
            });

            $rootScope.languageDescription = function (iso) {
                var language = $rootScope.languagesMap[iso];
                if (!language || 0 === language.length) {
                    return iso;
                }
                return language;
            }

            $rootScope.timezones = {};
            Util.timezones(function (response) {
                if (response.result != null) {
                    for (var key in response.result) {
                        var value = response.result[key];
                        $rootScope.timezones[value] = value;
                    }
                }

                $rootScope.timezones[''] = 'No timezone';
            });

            $rootScope.location = rtrim(rtrim($location.absUrl(), '/#/'), '/');
            $rootScope.startLocation = $rootScope.location
            $rootScope.host = $location.host();
            $rootScope.uniqueButton = new Date().getTime();

            $rootScope.generateButton = function () {
                $location.path('/generatebutton').replace();
            }

            $rootScope.scrollToId = function(id){
                $location.hash(id);
                $anchorScroll();
            }
        }
    ]
);

function rtrim(str, chr) {
    var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr + '+$');
    return str.replace(rgxtrim, '');
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
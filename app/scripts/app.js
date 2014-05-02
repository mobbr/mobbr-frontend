'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);
angular.module('mobbr.filters', []);
angular.module('mobbr.configuration', []);

/**
 * Prevent the dropdown from closing when an input is clicked, fix this nicer, perhaps make a push request to angular ui team
 */

angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle',
  ['$document', '$location', '$window', function ($document, $location, $window) {
    var openElement = null,
      closeMenu = angular.noop;
    return {
      restrict: 'CA',
      link: function (scope, element, attrs) {
        scope.$watch('$location.path', function () {
          closeMenu();
        });
        element.parent().bind('click', function (event) {
          closeMenu(event);
        });
        element.bind('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var elementWasOpen = (element === openElement);
          if (!!openElement) {
            closeMenu();
          }
          if (!elementWasOpen) {
            element.parent().addClass('open');
            openElement = element;
            closeMenu = function (event) {
              if ((event && event.toElement
                && event.toElement.tagName !== 'INPUT'
                && event.toElement.tagName !== 'SELECT'
                && event.toElement.tagName !== 'TEXTAREA'
                && event.toElement.tagName !== 'BUTTON') || !event) {
                if (event && event.toElement.tagName !== 'A' && event.toElement.tagName !== 'IMG') {
                  event.preventDefault();
                  event.stopPropagation();
                }
                $document.unbind('click', closeMenu);
                element.parent().removeClass('open');
                closeMenu = angular.noop;
                openElement = null;
              }
            };
            $document.bind('click', closeMenu);
          }
        });
      }
    };
  }]);

angular.module('mobbr', [

        'ngRoute',
        'ngTable',
        'ui.bootstrap',
        'mobbrApi',
        'mobbrMsg',
        'mobbrSession',
        'mobbr.config',
        'mobbr.controllers',
        'mobbr.services.invoice',
        'mobbr.services.pdf',
        'mobbr.directives',
        'mobbr.filters',
        'angularFileUpload'

    ]).config(function ($routeProvider) {

        var resolver = {};

        resolver.auth = function ($q, $route, $location, mobbrMsg, mobbrSession) {

            var deferred = $q.defer(),
                route = $route.current && $route.current.$$route;

            if (route && route.authsettings && route.authsettings.authenticated !== mobbrSession.isAuthorized()) {
                deferred.reject();
                route.authsettings.redirectTo && $location.path(route.authsettings.redirectTo);
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        $routeProvider.when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            }).when('/login/:hash', {
                templateUrl: 'views/link-login.html',
                controller: 'LinkLoginController'
            }).when('/activate/:hash', {
                templateUrl: 'views/activate.html',
                controller: 'ActivateController'
            }).when('/email/:hash', {
                templateUrl: 'views/update-email.html',
                controller: 'UpdateEmailController'
            }).when('/recover', {
                templateUrl: 'views/recover-password.html',
                controller: 'ResetPasswordController',
                authsettings: { authenticated: false, redirectTo: '/wallet' },
                resolve: resolver
            }).when('/join', {
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                authsettings: { authenticated: false, redirectTo: '/wallet' },
                resolve: resolver
            }).when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                authsettings: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).when('/wallet', {
                templateUrl: 'views/wallet.html',
                controller: 'WalletController',
                authsettings: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).when('/sourcing', {
                templateUrl: 'views/sourcing.html',
                controller: 'SourcingController',
                authsettings: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).when('/working', {
                templateUrl: 'views/working.html',
                controller: 'WorkingController',
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
                controller: 'ExchangeRateController'
            }).when('/integration', {
                templateUrl: 'views/integration.html'
            }).when('/api', {
                templateUrl: 'views/api.html'
            }).when('/usecases', {
                templateUrl: 'views/usecases.html'
            }).when('/siteconnector', {
                templateUrl: 'views/siteconnector.html'
            }).when('/features', {
                templateUrl: 'views/features.html'
            }).when('/gettingstarted', {
                templateUrl: 'views/gettingstarted.html'
            }).when('/company', {
                templateUrl: 'views/company.html'
            }).when('/validator', {
                templateUrl: 'views/validator.html'
            }).when('/payment/:id', {
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).when('/x-payment/:id', {
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).when('/url/:url', {
                templateUrl: 'views/url.html',
                controller: 'UrlReceiptController'
            }).otherwise({
                redirectTo: '/'
            }
        );

    }).run(function ($http, $rootScope, $route, $location, $window, $anchorScroll, MobbrApi, MobbrUser, mobbrMsg, mobbrSession, apiUrl, environment, lightboxUrl, uiUrl) {

        $rootScope.mobbrMsg = mobbrMsg;
        $rootScope.uiUrl = uiUrl;
        $rootScope.currenciesMap = MobbrApi.forexCurrencies();
        $rootScope.languagesMap = MobbrApi.isoLanguages();
        $rootScope.countriesMap = MobbrApi.isoCountries();
        $rootScope.timezones = MobbrApi.isoTimezones();
        $rootScope.host = $location.host();

        $rootScope.incomerangeMap = {
            1: 'less than € 18000',
            2: 'between € 18000 and € 30000',
            3: 'between € 30000 and € 50000',
            4: 'between € 50000 and € 80000',
            5: 'between € 80000 and € 120000',
            6: 'more than € 120000'
        };

        if (environment !== 'production') {
            $window.mobbr.setApiUrl(apiUrl);
            $window.mobbr.setUiUrl(uiUrl);
            $window.mobbr.setLightboxUrl(lightboxUrl);
            $window.mobbr.createDiv();
        }

        $rootScope.login = function (email, password) {
            $rootScope.authenticating = MobbrUser.passwordLogin({ email: email, password: password }, function () {
                $location.path('/wallet');
            });
        };

        $rootScope.logout = function () {
            MobbrUser.logout();
            $location.path('/');
        }

        $rootScope.isTest = function () {
            return environment !== 'production';
        }

        $rootScope.linkUrl = function (url) {
            return '/#/url/' + window.btoa(url);
        }

        $rootScope.scrollToId = function (id) {
            $location.hash(id);
            $anchorScroll();
        }

        $rootScope.$watch('mobbrMsg.messages', function () {

            var msg = mobbrMsg.messages[mobbrMsg.messages.length - 1];

            if (msg) {
                new PNotify({
                    title: '',
                    text: msg.msg,
                    type: msg.type || 'info',
                    styling: 'bootstrap3'
                });
            }
        }, true);
    }
);
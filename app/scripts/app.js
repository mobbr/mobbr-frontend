'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.services', []);
angular.module('mobbr.directives', []);
angular.module('mobbr.filters', []);
angular.module('mobbr.configuration', []);

/**
 * Prevent the dropdown from closing when an input is clicked
 */

$(function () {
   $('.dropdown input').click(function (e) {
       e.stopPropagation();
   });
});

angular.module('mobbr', [

        'ngRoute',
        'ngTable',
        'ui.bootstrap',
        'ui.router',
        'mobbrApi',
        'mobbrMsg',
        'mobbrSession',
        'mobbr.config',
        'mobbr.controllers',
        'mobbr.services',
        'mobbr.services.invoice',
        'mobbr.services.pdf',
        'mobbr.directives',
        'mobbr.filters',
        'angularFileUpload'

    ]).config(function ($stateProvider, $urlRouterProvider) {

        var resolver = {};

        $stateProvider.state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController'
            }).state('login', {
                url: '/login/:hash',
                templateUrl: 'views/link-login.html',
                controller: 'LinkLoginController'
            }).state('activate', {
                url: '/activate/:hash',
                templateUrl: 'views/activate.html',
                controller: 'ActivateController'
            }).state('email', {
                url: '/email/:hash',
                templateUrl: 'views/update-email.html',
                controller: 'UpdateEmailController'
            }).state('recover', {
                url: '/recover',
                templateUrl: 'views/recover-password.html',
                controller: 'ResetPasswordController',
                data: { authenticated: false, redirectTo: '/wallet' },
                resolve: resolver
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false, redirectTo: '/wallet' },
                resolve: resolver
            }).state('settings', {
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                data: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).state('settings.account', {
                url: '/settings',
                templateUrl: 'views/settings.account.html'
            }).state('settings.identity', {
                url: '/settings/identity',
                templateUrl: 'views/settings.identity.html'
            }).state('settings.proof', {
                url: '/settings/proof',
                templateUrl: 'views/settings.proof.html'
            }).state('settings.invoicing', {
                url: '/settings/invoicing',
                templateUrl: 'views/settings.invoicing.html'
            }).state('settings.display', {
                url: '/settings/display',
                templateUrl: 'views/settings.display.html'
            }).state('settings.privacy', {
                url: '/settings/privacy',
                templateUrl: 'views/settings.privacy.html'
            }).state('settings.notifications', {
                url: '/settings/notifications',
                templateUrl: 'views/settings.notifications.html'
            }).state('wallet', {
                templateUrl: 'views/wallet.html',
                controller: 'WalletController',
                data: { authenticated: true, redirectTo: 'main' },
                resolve: resolver
            }).state('wallet.credit', {
                url: '/wallet',
                templateUrl: 'views/wallet.credit.html'
            }).state('wallet.new', {
                url: '/wallet/new',
                templateUrl: 'views/wallet.new.html'
            }).state('wallet.payments', {
                url: '/wallet/payments',
                templateUrl: 'views/wallet.payments.html'
            }).state('wallet.xpayments', {
                url: '/wallet/xpayments',
                templateUrl: 'views/wallet.xpayments.html'
            }).state('sourcing', {
                templateUrl: 'views/sourcing.html',
                controller: 'SourcingController',
                data: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).state('sourcing.request', {
                url: '/sourcing',
                templateUrl: 'views/sourcing.request.html'
            }).state('sourcing.pending', {
                url: '/sourcing/pending',
                templateUrl: 'views/sourcing.pending.html'
            }).state('sourcing.download', {
                url: '/sourcing/download',
                templateUrl: 'views/sourcing.download.html'
            }).state('sourcing.pledged', {
                url: '/sourcing/pledged',
                templateUrl: 'views/sourcing.pledged.html'
            }).state('sourcing.workers', {
                url: '/sourcing/workers',
                templateUrl: 'views/sourcing.workers.html'
            }).state('working', {
                templateUrl: 'views/working.html',
                controller: 'WorkingController',
                data: { authenticated: true, redirectTo: '/' },
                resolve: resolver
            }).state('working.new', {
                url: '/working',
                templateUrl: 'views/working.new.html'
            }).state('working.tasks', {
                url: '/working/tasks',
                templateUrl: 'views/working.tasks.html'
            }).state('working.confirm', {
                url: '/working/confirm',
                templateUrl: 'views/working.confirm.html'
            }).state('working.download', {
                url: '/working/download',
                templateUrl: 'views/working.download.html'
            }).state('domain', {
                url: '/domain/:url',
                templateUrl: 'views/domain.html',
                controller: 'DomainController'
            }).state('claimpayment', {
                url: '/claimpayment',
                templateUrl: 'views/claim_payment.html',
                controller: 'ClaimPaymentController'
            }).state('generatebutton', {
                url: '/generatebutton',
                templateUrl: 'views/generate_button.html',
                controller: 'CreateButtonController'
            }).state('exchangerate', {
                url: '/exchangerate',
                templateUrl: 'views/exchangerate.html',
                controller: 'ExchangeRateController'
            }).state('integration', {
                url: '/integration',
                templateUrl: 'views/integration.html'
            }).state('api', {
                url: '/api',
                templateUrl: 'views/api.html'
            }).state('usecases', {
                url: '/usecases',
                templateUrl: 'views/usecases.html'
            }).state('siteconnector', {
                url: '/siteconnector',
                templateUrl: 'views/siteconnector.html'
            }).state('features', {
                url: '/features',
                templateUrl: 'views/features.html'
            }).state('gettingstarted', {
                url: '/gettingstarted',
                templateUrl: 'views/gettingstarted.html'
            }).state('company', {
                url: '/company',
                templateUrl: 'views/company.html'
            }).state('validator', {
                url: '/validator',
                templateUrl: 'views/validator.html'
            }).state('payment', {
                url: '/payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).state('x-payment', {
                url: '/x-payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).state('url', {
                url: '/url/:url',
                templateUrl: 'views/url.html',
                controller: 'UrlReceiptController'
            }
        );

        $urlRouterProvider.otherwise('/');

    }).run(function ($http, $rootScope, $route, $state, $location, $window, $anchorScroll, MobbrApi, MobbrUser, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

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
        
        $rootScope.$state = $state;

        $rootScope.login = function (email, password) {
            $rootScope.authenticating = MobbrUser.passwordLogin({ email: email, password: password }, function () {
                $location.path('/wallet');
            });
        };

        $rootScope.logout = function () {
            MobbrUser.logout();
            $location.path('/');
        }

        $rootScope.openExternalPayment = function (item) {
            $location.path('/x-payment/' + item.id);
        }

        $rootScope.openPayment = function (item) {
            $location.path('/payment/' + item.id);
        }

        $rootScope.isTest = function () {
            return environment !== 'production';
        }

        $rootScope.linkUrl = function (url) {
            return '/#/url/' + window.btoa(url);
        }

        $rootScope.mobbrNow = function (mobbrNow) {
            $window.mobbr.makePayment(mobbrNow);
        }

      // TODO: check what code should actually be here and move everything else to the services they belong to

      $rootScope.currenciesMap = {};
      MobbrApi.forexCurrencies(function (response) {
        if (response.result != null) {
          $rootScope.currenciesMap = response.result;
          $rootScope.currencyArray = [];
          angular.forEach($rootScope.currenciesMap, function (key, value) {
            $rootScope.currencyArray.push({'description': key, 'code': value});
          });
          $rootScope.$broadcast('currencie-array-ready');
        }
      });

      $rootScope.currencyDescription = function (iso) {
        var currency = $rootScope.currenciesMap[iso];
        if (!currency || 0 === currency.length) {
          return iso;
        }
        return currency;
      }

      MobbrApi.isoLanguages(function (response) {
        if (response.result != null) {
          $rootScope.languagesMap = response.result;
          $rootScope.languagesMap['leeg'] = 'No language';
          $rootScope.languageArray = [];
          angular.forEach($rootScope.languagesMap, function (key, value) {
            $rootScope.languageArray.push({'description': key, 'code': value});
          });
          $rootScope.$broadcast('language-array-ready');
        }
      });

      MobbrApi.isoCountries(function (response) {
        if (response.result != null) {
          $rootScope.countriesMap = response.result;
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
      MobbrApi.isoTimezones(function (response) {
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

      $rootScope.scrollToId = function (id) {
        $location.hash(id);
        $anchorScroll();
      }

      $rootScope.incomerangeMap = {
        1: 'less than € 18000',
        2: 'between € 18000 and € 30000',
        3: 'between € 30000 and € 50000',
        4: 'between € 50000 and € 80000',
        5: 'between € 80000 and € 120000',
        6: 'more than € 120000'
      };
    }
).config(function($routeProvider, $provide) {

        /**
         * overwrite angular's directive ngSwitchWhen
         * can handle ng-switch-when="value1 || value2 || value3"
         */

        $provide.decorator('ngSwitchWhenDirective', function($delegate) {
            $delegate[0].compile = function(element, attrs, transclude) {
                return function(scope, element, attr, ctrl) {
                    var subCases = [attrs.ngSwitchWhen];
                    if(attrs.ngSwitchWhen && attrs.ngSwitchWhen.length > 0 && attrs.ngSwitchWhen.indexOf('||') != -1) {
                        subCases = attrs.ngSwitchWhen.split('||');
                    }
                    var i=0;
                    var casee;
                    var len = subCases.length;
                    while(i<len) {
                        casee = $.trim(subCases[i++]);
                        ctrl.cases['!' + casee] = (ctrl.cases['!' + casee] || []);
                        ctrl.cases['!' + casee].push({ transclude: transclude, element: element });
                    }
                }
            }
            return $delegate;
        });
    });;

/* TODO: Check if functions below are really needed, if not remove them
 */

function rtrim(str, chr) {
  var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr + '+$');
  return str.replace(rgxtrim, '');
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
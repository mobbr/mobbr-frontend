'use strict';

angular.module('mobbr.controllers', []);
angular.module('mobbr.directives', []);
angular.module('mobbr.filters', []);

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
    'ui.bootstrap',
    'mobbr.controllers',
    'mobbr.services.msg',
    'mobbr.services.mbr-api',
    'mobbr.services.user',
    'mobbr.services.storage',
    'mobbr.directives',
    'mobbr.filters',
    'ngCookies'

  ]).config(function ($routeProvider, $parseProvider) {

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
          authsettings: { authenticated: false, redirectTo: '/wallet' },
          resolve: resolver
        }).when('/activate/:hash', {
          templateUrl: 'views/activate.html',
          controller: 'ActivateController',
          authsettings: { authenticated: false, redirectTo: '/wallet' },
          resolve: resolver
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
        }).when('/company', {
          templateUrl: 'views/company.html'
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


      $parseProvider.logPromiseWarnings(true);
    }
  ).run(function ($http, $rootScope, Util, $location, userSession, Msg, $window, $anchorScroll) {

      $rootScope.isTest = function () {
        return window.location.href.search('test-www.mobbr.com');
      }

      // TODO: check what code should actually be here and move everything else to the services they belong to

      $rootScope.currenciesMap = {};
      Util.currencies(function (response) {
        if (response.result != null) {
          $rootScope.currenciesMap = response.result;
          $rootScope.currencieArray = [];
          angular.forEach($rootScope.currenciesMap, function (key, value) {
            $rootScope.currencieArray.push({'description': key, 'code': value});
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

      Util.languages(function (response) {
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

      Util.countries(function (response) {
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

      $rootScope.scrollToId = function (id) {
        $location.hash(id);
        $anchorScroll();
      }
    }
  );

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
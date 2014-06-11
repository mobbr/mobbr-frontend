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
   $('.dropdown input, .dropdown button').click(function (e) {
       e.stopPropagation();
   });
});

angular.module('mobbr', [

        'ngTable',
        'ngStorage',
        'ui.bootstrap',
        'ui.router',
        'ui.scrollfix',
        'mobbrApi',
        'mobbrMsg',
        'mobbrSession',
        'mobbr.config',
        'mobbr.controllers',
        'mobbr.services',
        'mobbr.directives',
        'mobbr.filters',
        'angularFileUpload'

    ]).config(function ($stateProvider, $urlRouterProvider) {

        function reloadTable(data, table) {
            table.reload(data.result);
        }

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
                data: { authenticated: false, redirectTo: '/wallet' }
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false, redirectTo: '/wallet' }
            }).state('settings', {
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                data: { authenticated: true, redirectTo: '/' }
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
                data: { authenticated: true, redirectTo: 'main' }
            }).state('wallet.credit', {
                url: '/wallet',
                templateUrl: 'views/wallet.credit.html'
            }).state('wallet.payments', {
                url: '/wallet/payments',
                templateUrl: 'views/wallet.payments.html'
            }).state('wallet.pledges', {
                url: '/wallet/pledges',
                templateUrl: 'views/wallet.pledges.html'
            }).state('wallet.xpayments', {
                url: '/wallet/xpayments',
                templateUrl: 'views/wallet.xpayments.html'
            }).state('invoicing', {
                url: '/invoicing',
                abstract: true,
                templateUrl: 'views/sourcing.html',
                controller: 'SourcingController',
                data: { authenticated: true, redirectTo: '/' }
            }).state('invoicing.sourcing_request', {
                url: '/sourcing/request',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.requestable().$promise;
                    }
                },
                data: {
                    buttonText: 'Request invoices',
                    buttonAction: 'requestInvoices'
                },
                onEnter: reloadTable
            }).state('invoicing.sourcing_pending', {
                url: '/sourcing/pending',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.requested().$promise;
                    }
                },
                data: {
                    buttonText: 'Cancel request',
                    buttonAction: 'cancelInvoices'
                },
                onEnter: reloadTable
            }).state('invoicing.sourcing_download', {
                url: '/sourcing/download',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.returned().$promise;
                    }
                },
                data: {
                    buttonText: 'Download invoice',
                    buttonAction: 'downloadInvoices'
                },
                onEnter: reloadTable
            }).state('invoicing.working_confirm', {
                url: '/working/confirm',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.confirmable().$promise;
                    }
                },
                data: {
                    buttonText: 'Confirm invoice',
                    buttonAction: 'confirmInvoices',
                    columns: [ 'title', 'worker_username', 'role', 'currency_iso', 'amount' ]
                },
                onEnter: reloadTable
            }).state('invoicing.working_download', {
                url: '/working/download',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.confirmed().$promise;
                    }
                },
                data: {
                    buttonText: 'Download invoice',
                    buttonAction: 'downloadInvoices',
                    columns: [ 'title', 'worker_username', 'role', 'currency_iso', 'amount' ]
                },
                onEnter: reloadTable
            }).state('sourcing.pledged', {
                url: '/sourcing/pledged',
                templateUrl: 'views/sourcing.pledged.html'
            }).state('sourcing.workers', {
                url: '/sourcing/workers',
                templateUrl: 'views/sourcing.workers.html'
            }).state('working', {
                templateUrl: 'views/working.html',
                controller: 'WorkingController',
                data: { authenticated: true, redirectTo: '/' }
            }).state('working.new', {
                url: '/working',
                templateUrl: 'views/working.new.html'
            }).state('working.tasks', {
                url: '/working/tasks',
                templateUrl: 'views/working.tasks.html'
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

    }).run(function ($http, $rootScope, $state, $location, $window, $anchorScroll, MobbrApi, MobbrUser, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

        var querystring = $window.location.search;

        if (querystring) {
            $window.location.href = $window.location.href.replace(querystring, '');
        }

        $rootScope.$state = $state;
        $rootScope.mobbrMsg = mobbrMsg;
        $rootScope.mobbrSession = mobbrSession;
        $rootScope.uiUrl = uiUrl;
        $rootScope.currenciesMap = MobbrApi.forexCurrencies();
        $rootScope.languagesMap = MobbrApi.isoLanguages();
        $rootScope.countriesMap = MobbrApi.isoCountries();
        $rootScope.timezones = MobbrApi.isoTimezones();
        $rootScope.incomerangeMap = MobbrApi.kycIncomeRanges();
        $rootScope.host = $location.host();

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

        $rootScope.scrollToId = function (id) {
            $location.hash(id);
            $anchorScroll();
        }
    }).config(function($provide) {

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
    }
);
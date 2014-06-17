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
            if (data.$resolved) {
                table.reload(data.result);
            } else {

                // we have to wait implement caching here
                data.$promise.then(function () {
                    table.reload(data.result);
                });
            }
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
                data: { authenticated: false, redirectTo: 'wallet.credit' }
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false, redirectTo: 'wallet.credit' }
            }).state('settings', {
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                data: { authenticated: true, redirectTo: 'main' }
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
                templateUrl: 'views/invoicing.html',
                controller: 'InvoicingController',
                data: { authenticated: true, redirectTo: 'main' }
            }).state('invoicing.sourcing_request', {
                url: '/sourcing/request',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.requestable();
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
                        return MobbrInvoice.requested();
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
                        return MobbrInvoice.returned();
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
                        return MobbrInvoice.confirmable();
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
                        return MobbrInvoice.confirmed();
                    }
                },
                data: {
                    buttonText: 'Download invoice',
                    buttonAction: 'downloadInvoices',
                    columns: [ 'title', 'worker_username', 'role', 'currency_iso', 'amount' ]
                },
                onEnter: reloadTable
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
            }).state('main.payment', {
                url: 'payment/:id',
                onEnter: function ($rootScope, $stateParams) {
                    $rootScope.openPayment({ id: $stateParams.id });
                },
                onExit: function (mobbrModal) {
                    mobbrModal.close();
                }
            }).state('main.x-payment', {
                url: 'x-payment/:id',
                onEnter: function ($rootScope, $stateParams) {
                    $rootScope.openExternalPayment({ id: $stateParams.id });
                },
                onExit: function (mobbrModal) {
                    mobbrModal.close();
                }
            }).state('url', {
                url: '/url/:url',
                templateUrl: 'views/url.html',
                controller: 'UrlReceiptController',
                resolve: {
                    payment: function ($window, $stateParams, MobbrPayment) {
                        return MobbrPayment.preview({
                            data: $window.atob($stateParams.url),
                            referrer: $window.location.href
                        }).$promise;
                    }
                }
            }
        );

        $urlRouterProvider.otherwise('/');

    }).run(function ($http, $rootScope, $state, $location, $window, $anchorScroll, mobbrModal, MobbrApi, MobbrUser, MobbrBalance, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

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
        $rootScope.userBalance = MobbrBalance.user();
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

        function paymentModal(id, external) {
            return mobbrModal.open({
                backdrop: true,
                keyboard: true,
                backdropClick: true,
                templateUrl: 'views/partials/payment_popup.html',
                controller: 'PaymentReceiptController',
                resolve: {
                    payment: function (MobbrPayment, MobbrXPayment) {
                        return external
                            ? MobbrXPayment.info({ id: id }).$promise
                            : MobbrPayment.info({ id: id }).$promise;
                    },
                    external: function () {
                        return external;
                    }
                }
            });
        }

        $rootScope.openExternalPayment = function (item) {
            //$location.path('/x-payment/' + item.id);
            return paymentModal(item.id, true);
        }

        $rootScope.openPayment = function (item) {
            //$location.path('/payment/' + item.id);
            return paymentModal(item.id);
        }

        $rootScope.getPaymentUrl= function (id, external) {
            return uiUrl + '/#/' + (external && 'x-' || '') +  'payment/' + id;
        }

        $rootScope.isTest = function () {
            return environment !== 'production';
        }

        $rootScope.linkUrl = function (url) {
            return '/#/url/' + window.btoa(url);
        }

        $rootScope.mobbrNow = function (mobbrNow) {
            $location.path('/url/' + window.btoa(mobbrNow));
            //$window.mobbr.makePayment(mobbrNow);
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
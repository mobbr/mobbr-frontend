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
            table.reset(data, this);
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
            }).state('table', {
                abstract: true,
                templateUrl: 'views/table.html',
                controller: 'TableController',
                data: {
                    columns: [ 'title', 'username', 'role', 'currency_iso', 'amount' ],
                    groups: [ 'uri', 'username', 'role', 'currency_iso' ],
                    empty_message: 'No items available',
                    selectable: false,
                    sorting: {
                        datetime: 'desc'
                    }
                }
            }).state('table.wallet', {
                url: '/wallet',
                abstract: true,
                templateUrl: 'views/sidebars/wallet.html',
                controller: 'WalletController',
                data: {
                    authenticated: true,
                    redirectTo: 'main',
                    groups: [ 'url', 'currency_iso' ],
                    buttons: [
                        {
                            buttonText: 'Deposit',
                            buttonAction: 'deposit',
                            selectable: false
                        },
                        {
                            buttonText: 'Withdraw',
                            buttonAction: 'withdraw',
                            selectable: false
                        }
                    ]
                },
                resolve: {
                    userBalance: function (MobbrBalance) {
                        return MobbrBalance.user().$promise;
                    }
                }
            }).state('table.wallet.credit', {
                url: '/credit',
                data: {
                    index: 'balances',
                    columns: [ 'currency_description', 'currency', 'amount', 'fee', 'spendable' ],
                    groups: [],
                    sorting: {
                        amount: 'asc'
                    }
                },
                resolve: {
                    data: function (MobbrBalance) {
                        return MobbrBalance.user().$promise;
                    }
                },
                onEnter: reloadTable
            }).state('table.wallet.payments', {
                url: '/payments',
                resolve: {
                    data: function (MobbrPayment) {
                        return MobbrPayment.get();
                    }
                },
                data: {
                    columns: [ 'datetime', 'title', 'currency', 'amount' ],
                    clickRow: 'openPayment'
                },
                onEnter: reloadTable
            }).state('table.wallet.pledges', {
                url: '/pledges',
                resolve: {
                    data: function (MobbrPayment) {
                        return MobbrPayment.pledged();
                    }
                },
                data: {
                    columns: [ 'datetime', 'title', 'url', 'currency', 'amount' ],
                    sorting: {
                        paiddatetime: 'desc'
                    },
                    buttonText: 'Delete pledges',
                    buttonAction: 'removePledges',
                    selectable: true,
                    clickRow: 'openPayment',
                    buttons: [
                        {
                            buttonText: 'Deposit',
                            buttonAction: 'deposit',
                            selectable: false
                        },
                        {
                            buttonText: 'Withdraw',
                            buttonAction: 'withdraw',
                            selectable: false
                        },
                        {
                            buttonText: 'Delete pledges',
                            buttonAction: 'removePledges',
                            selectable: true
                        }
                    ]
                },
                onEnter: reloadTable
            }).state('table.wallet.xpayments', {
                url: '/xpayments',
                resolve: {
                    data: function (MobbrXPayment) {
                        return MobbrXPayment.get();
                    }
                },
                data: {
                    columns: [ 'datetime', 'payment_service', 'receive_address', 'note', 'status', 'currency_iso', 'amount' ],
                    groups: [ 'payment_service', 'currency_iso' ],
                    sorting: false,
                    clickRow: 'openExternalPayment'
                },
                onEnter: reloadTable
            }).state('table.invoicing', {
                url: '/invoicing',
                abstract: true,
                templateUrl: 'views/sidebars/invoicing.html',
                controller: 'InvoicingController',
                data: {
                    authenticated: true,
                    redirectTo: 'main',
                    groupby: 'uri',
                    selectable: true,
                    sorting: {
                        paiddatetime: 'desc'
                    }
                }
            }).state('table.invoicing.sourcing_request', {
                url: '/sourcing/request',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.requestable();
                    }
                },
                data: {
                    buttons: [
                        {
                            buttonText: 'Request invoices',
                            buttonAction: 'requestInvoices',
                            selectable: true
                        }
                    ]
                },
                onEnter: reloadTable
            }).state('table.invoicing.sourcing_pending', {
                url: '/sourcing/pending',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.requested();
                    }
                },
                data: {
                    buttons: [
                        {
                            buttonText: 'Cancel request',
                            buttonAction: 'cancelInvoices',
                            selectable: true
                        }
                    ]
                },
                onEnter: reloadTable
            }).state('table.invoicing.sourcing_download', {
                url: '/sourcing/download',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.returned();
                    }
                },
                data: {
                    buttons: [
                        {
                            buttonText: 'Download invoice',
                            buttonAction: 'downloadInvoices',
                            selectable: true
                        }
                    ]
                },
                onEnter: reloadTable
            }).state('table.invoicing.working_confirm', {
                url: '/working/confirm',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.confirmable();
                    }
                },
                data: {
                    buttons: [
                        {
                            buttonText: 'Confirm invoice',
                            buttonAction: 'confirmInvoices',
                            selectable: true
                        }
                    ],
                    columns: [ 'title', 'worker_username', 'role', 'currency_iso', 'amount' ]
                },
                onEnter: reloadTable
            }).state('table.invoicing.working_download', {
                url: '/working/download',
                resolve: {
                    data: function (MobbrInvoice) {
                        return MobbrInvoice.confirmed();
                    }
                },
                data: {
                    buttons: [
                        {
                            buttonText: 'Download invoice',
                            buttonAction: 'downloadInvoices',
                            selectable: true
                        }
                    ],
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
                    payment: function ($window, $stateParams, $state, $q, MobbrPayment) {
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
                //$location.path('/wallet');
                $state.go('table.wallet.credit');
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
    }
);
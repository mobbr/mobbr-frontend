'use strict';

angular.module('mobbr.controllers', ['angularFileUpload','mobbrApi','mobbrMsg','mobbrSession','mobbr.config','ngTable']);
angular.module('mobbr.services', []);
angular.module('mobbr.directives', ['mobbrSession','mobbr.config']);
angular.module('mobbr.filters',  ['mobbrSession','mobbr.config']);
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

        'ngStorage',
        'ui.bootstrap',
        'ui.router',
        'ui.scrollfix',
        'ui.unique',
        'mobbrApi',
        'mobbrMsg',
        'mobbrSession',
        'mobbr.config',
        'mobbr.controllers',
        'mobbr.services',
        'mobbr.directives',
        'mobbr.filters',
        'angularMoment'

    ]).config(function ($stateProvider, $urlRouterProvider) {

        function reloadTable(data, table) {
            table.reset(data, this);
        }

        $stateProvider.state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController'
            }).state('updates', {
                url: '/updates',
                templateUrl: 'views/updates.html',
                controller: 'UpdatesController'
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
                data: { authenticated: false, redirectTo: 'table.wallet.credit' }
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false, redirectTo: 'table.wallet.credit' }
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
                data: {
                    authenticated: true,
                    redirectTo: 'main'
                }
            }).state('wallet.default', {
                url: '/wallet'
            }).state('wallet.pay', {
                url: '/wallet/pay',
                templateUrl: 'views/wallet.pay.html'
            }).state('wallet.deposit', {
                url: '/wallet/deposit',
                templateUrl: 'views/wallet.deposit.html'
            }).state('wallet.withdraw', {
                url: '/wallet/withdraw',
                templateUrl: 'views/wallet.withdraw.html'
            }).state('payments', {

                templateUrl: 'views/payments.html',
                controller: 'PaymentsController',
                data: {
                    authenticated: true,
                    redirectTo: 'main'
                }
            }).state('payments.pledges', {
                url: '/payments'
            }).state('payments.unclaimed', {
                url: '/payments/unclaimed'
            }).state('payments.payments', {
                url: '/payments/payments'
            }).state('domain', {
                url: '/domain/:url',
                templateUrl: 'views/domain.html',
                controller: 'DomainController'
            }).state('claim payment', {
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
            }).state('tasks', {
                abstract: true,
                controller: 'TasksController',
                templateUrl: 'views/tasks.html'
            }).state('tasks.filter', {
                url: '/tasks',
                views: {
                    'tasks-section': {
                        controller: 'TasksFilterController',
                        templateUrl: 'views/tasks.filter.html'
                    }
                },
                data: {
                    title: 'Explore tasks'
                }
            }).state('tasks.filter.tag', {
                url: '/:tag'
            }).state('tasks.view', {
                abstract: true,
                views: {
                    'tasks-section': {
                        controller: 'TaskController',
                        templateUrl: 'views/tasks.task.html'
                    }
                },
                data: {
                    title: 'Task status'
                }
            }).state('tasks.view.task', {
                url: '^/task/:task'
            }).state('tasks.view.task.domain', {
                url: '/domain',
                views: {
                    'task-section': {
                        controller: 'TaskDomainController',
                        templateUrl: 'views/tasks.task.domain.html'
                    }
                }
            }).state('tasks.view.task.payments', {
                url: '/payments',
                views: {
                    'task-section': {
                        controller: 'TaskPaymentsController',
                        templateUrl: 'views/tasks.task.payments.html'
                    }
                }
            }).state('tasks.view.task.persons', {
                url: '/persons',
                views: {
                    'task-section': {
                        controller: 'TaskPersonsController',
                        templateUrl: 'views/tasks.task.persons.html'
                    }
                }
            }).state('tasks.view.task.invite', {
                url: '/invite',
                views: {
                    'task-section': {
                        controller: 'TaskInviteController',
                        templateUrl: 'views/tasks.task.invite.html'
                    }
                }
            }).state('tasks.view.task.pay', {
                url: '/pay',
                views: {
                    'pay@tasks': {
                        controller: 'TaskPayController',
                        templateUrl: 'views/tasks.task.pay.html'
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

        $rootScope.currenciesMap = {};
        $rootScope.languagesMap = {};
        $rootScope.countriesMap = {};

        $rootScope.currencies = MobbrApi.currencies(function (response) {
            response.result.forEach(function (item) { $rootScope.currenciesMap[item.currency_iso] = item; });
            console.log($rootScope.currenciesMap);
        });
        $rootScope.languages = MobbrApi.isoLanguages(function (response) {
            response.result.forEach(function (item) { $rootScope.languagesMap[item.code] = item.name; });
        });
        $rootScope.countries = MobbrApi.isoCountries(function (response) {
            response.result.forEach(function (item) { $rootScope.countriesMap[item.code] = item.name; });
        });

        $rootScope.timezones = MobbrApi.isoTimezones();
        $rootScope.incomerangeMap = MobbrApi.kycIncomeRanges();
        $rootScope.userBalance = MobbrBalance.user();
        $rootScope.host = $location.host();
        $rootScope.oAuthProviders =  MobbrApi.oauthProviders();


        if (environment !== 'production') {
            $window.mobbr.setApiUrl(apiUrl);
            $window.mobbr.setUiUrl(uiUrl);
            $window.mobbr.setLightboxUrl(lightboxUrl);
            $window.mobbr.createDiv();
        }

        $rootScope.login = function (username, password) {
            $rootScope.authenticating = MobbrUser.passwordLogin({ username: username, password: password }, function () {
                //$state.go('table.wallet.credit');
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
        };

        $rootScope.scrollToId = function (id) {
            $location.hash(id);
            $anchorScroll();
        };


    }
);
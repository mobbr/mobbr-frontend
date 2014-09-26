'use strict';

angular.module('mobbr.controllers', ['angularFileUpload', 'mobbrApi', 'mobbrMsg', 'mobbrSession', 'mobbr.config', 'ngTable', 'ngStorage', 'ui.bootstrap']);
angular.module('mobbr.services', []);
angular.module('mobbr.directives', ['mobbrSession', 'mobbr.config', 'ui.bootstrap']);
angular.module('mobbr.filters', ['mobbrSession', 'mobbr.config']);
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

        'ui.bootstrap',
        'ngStorage',
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

        function blockUI($rootScope) {
            $rootScope.blockUI = true;
        }

        function unblockUI($rootScope) {
            $rootScope.blockUI = false;
        }

        $stateProvider.state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController',
                data: { authenticated: false, redirectTo: 'updates' }
            }).state('updates', {
                url: '/updates',
                templateUrl: 'views/updates.html',
                controller: 'UpdatesController',
                data: { authenticated: true, redirectTo: 'main' },
                resolve: {
                    balance: function (MobbrBalance) {
                        return MobbrBalance.get().$promise;
                    },
                    notifications: function (MobbrNotifications) {
                        return MobbrNotifications.get({ limit: 10 }).$promise;
                    },
                    person: function (MobbrPerson, $rootScope) {
                        return MobbrPerson.info({ username: $rootScope.$mobbrStorage.user.username }).$promise;
                    }
                }
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
                data: { authenticated: false, redirectTo: 'updates' }
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false, redirectTo: 'updates' }
            }).state('settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                data: { authenticated: true, redirectTo: 'main' }
            }).state('settings.account', {
                url: '/account'
            }).state('settings.identity', {
                url: '/identity'
            }).state('settings.proof', {
                url: '/proof'
            }).state('settings.invoicing', {
                url: '/invoicing'
            }).state('settings.display', {
                url: '/display'
            }).state('settings.privacy', {
                url: '/privacy'
            }).state('settings.notifications', {
                url: '/notifications'
            }).state('settings.ids', {
                url: '/ids'
            }).state('wallet', {
                url: '/wallet',
                templateUrl: 'views/wallet.html',
                controller: 'WalletController',
                data: {
                    authenticated: true,
                    redirectTo: 'main'
                },
                resolve: {
                    balance: function (MobbrBalance) {
                        return MobbrBalance.get().$promise;
                    },
                    supportedCurrencies: function (MobbrXPayment) {
                        return MobbrXPayment.supportedCurrencies().$promise;
                    },
                    xpayments: function (MobbrXPayment) {
                        return MobbrXPayment.get({ limit: 10 }).$promise;
                    }
                }
            }).state('wallet.deposit', {
                url: '/deposit',
                views: {
                    'pay@wallet': {
                        controller: 'DepositController',
                        templateUrl: 'views/deposit.html'
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('wallet.withdraw', {
                url: '/withdraw',
                views: {
                    'pay@wallet': {
                        controller: 'WithdrawController',
                        templateUrl: 'views/withdraw.html'
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('wallet.x-payments', {
                url: '/x-payments'
            }).state('wallet.addresses', {
                url: '/addresses'
            }).state('payments', {
                url: '/payments',
                templateUrl: 'views/payments.html',
                controller: 'PaymentsController',
                data: {
                    authenticated: true,
                    redirectTo: 'main'
                }
            }).state('payments.pledges', {
                url: '/pledges'
            }).state('payments.payments', {
                url: '/payments'
            }).state('payments.unclaimed', {
                url: '/unclaimed'
            }).state('payments.pay', {
                url: '/pay',
                views: {
                    'pay@payments': {
                        controller: 'PayController',
                        templateUrl: 'views/pay.html'
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('payment', {
                url: '/payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).state('x-payment', {
                url: '/x-payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController'
            }).state('box', {
                abstract: true,
                templateUrl: 'views/box.html',
                controller: 'BoxController'
            }).state('box.tasks', {
                url: '/tasks',
                views: {
                    'tasks-section': {
                        controller: 'TasksController',
                        templateUrl: 'views/tasks.html'
                    }
                },
                data: {
                    title: 'Explore tasks'
                }
            }).state('box.tasks.person', {
                url: '/:person'
            }).state('box.task', {
                abstract: true,
                views: {
                    'tasks-section': {
                        controller: 'TaskController',
                        templateUrl: 'views/task.html'
                    }
                },
                data: {
                    title: 'Task status'
                }
            }).state('box.task.view', {
                url: '^/task/:task'
            }).state('box.task.view.domain', {
                url: '/domain',
                views: {
                    'task-section': {
                        controller: 'TaskDomainController',
                        templateUrl: 'views/task.domain.html'
                    }
                }
            }).state('box.task.view.script', {
                url: '/script',
                views: {
                    'task-section': {
                        templateUrl: 'views/task.script.html'
                    }
                }
            }).state('box.task.view.payments', {
                url: '/payments',
                views: {
                    'task-section': {
                        controller: 'TaskPaymentsController',
                        templateUrl: 'views/task.payments.html'
                    }
                }
            }).state('box.task.view.persons', {
                url: '/persons',
                views: {
                    'task-section': {
                        controller: 'TaskPersonsController',
                        templateUrl: 'views/task.persons.html'
                    }
                }
            }).state('box.task.view.invite', {
                url: '/invite',
                views: {
                    'task-section': {
                        controller: 'TaskInviteController',
                        templateUrl: 'views/task.invite.html'
                    }
                }
            }).state('box.task.view.pay', {
                url: '/pay',
                views: {
                    'pay@box': {
                        controller: 'PayController',
                        templateUrl: 'views/pay.html'
                    }
                }
            }).state('box.crowds', {
                url: '/crowds',
                views: {
                    'tasks-section': {
                        controller: 'CrowdsController',
                        templateUrl: 'views/crowds.html'
                    }
                },
                data: {
                    title: 'Invite workforce'
                }
            }).state('box.crowds.task', {
                url: '/:task'
            }).state('person', {
                url: '/person/:username',
                controller: 'PersonController',
                templateUrl: 'views/person.html',
                data: {
                    title: 'Profile'
                }
            });


        $urlRouterProvider.otherwise('/');

    }).run(function ($http, $rootScope, $state, $location, $window, $anchorScroll, filterFilter, MobbrApi, MobbrUser, MobbrBalance, MobbrXPayment, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

        if (environment !== 'production') {
            $window.mobbr.setApiUrl(apiUrl);
            $window.mobbr.setUiUrl(uiUrl);
            $window.mobbr.setLightboxUrl(lightboxUrl);
            $window.mobbr.createDiv();
        }

        $rootScope.$state = $state;
        $rootScope.host = $location.host();
        $rootScope.mobbrMsg = mobbrMsg;
        $rootScope.mobbrSession = mobbrSession;
        $rootScope.uiUrl = uiUrl;

        $rootScope.currenciesMap = {};
        $rootScope.languagesMap = {};
        $rootScope.countriesMap = {};
        $rootScope.idProviders = [];
        $rootScope.translationsMap = [];
        $rootScope.eventTypesMap = {};

        $rootScope.timezones = MobbrApi.isoTimezones();
        $rootScope.incomerangeMap = MobbrApi.kycIncomeRanges();
        $rootScope.oAuthProviders = MobbrApi.oauthProviders();
        $rootScope.usedLanguages = MobbrApi.isoLanguages({ include_unused: false });

        $rootScope.eventTypes = MobbrApi.eventTypes(function (response) {
            response.result.forEach(function (item) {
                $rootScope.eventTypesMap[item.event] = item;
            });
        });

        $rootScope.currencies = MobbrApi.currencies(function (response) {
            response.result.forEach(function (item) {
                $rootScope.currenciesMap[item.currency_iso] = item;
            });
        });

        $rootScope.languages = MobbrApi.isoLanguages(function (response) {
            response.result.forEach(function (item) {
                $rootScope.languagesMap[item.code] = item.name;
            });
        });

        $rootScope.translations = MobbrApi.translations(function (response) {
            response.result.forEach(function (item) {
                $rootScope.translationsMap[item.code] = item.name;
            });
        });

        $rootScope.countries = MobbrApi.isoCountries(function (response) {
            response.result.forEach(function (item) {
                $rootScope.countriesMap[item.code] = item.name;
            });
        });

        $rootScope.$on('mobbrApi:authchange', function () {
            if (mobbrSession.isAuthorized()) {
                MobbrBalance.get(function (response) {
                    $rootScope.userCurrencies = response.result.balances;
                });
            } else {
                if ($rootScope.currencies.$resolved) {
                    $rootScope.userCurrencies = filterFilter($rootScope.currencies.result, { wallet_support: true });
                } else {
                    $rootScope.currencies.$promise.then(function () {
                        $rootScope.userCurrencies = filterFilter($rootScope.currencies.result, { wallet_support: true });
                    });
                }
            }
        });

        MobbrApi.idProviders().$promise.then(function(response){
            $rootScope.idProviders = response.result;
        });

        $rootScope.getLanguage = function () {
            return $rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.language_iso && ($window.navigator.userLanguage || $window.navigator.language).toUpperCase();
        }

        $rootScope.login = function (username, password) {
            $rootScope.authenticating = MobbrUser.passwordLogin({ username: username, password: password });
        };

        $rootScope.encodeTask = function (url) {
            return $window.btoa(url);
        };

        $rootScope.logout = function () {
            MobbrUser.logout();
        };

        $rootScope.openExternalPayment = function (item) {
            $state.go('x-payment', { id: item.id || item.payment_id });
        }

        $rootScope.openPayment = function (item) {
            $state.go('payment', { id: item.id || item.payment_id });
        }

        $rootScope.isTest = function () {
            return environment !== 'production';
        }
    }
);
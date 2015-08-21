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
        'angularMoment',
        'angular-loading-bar',
        'angulike'

    ]).config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

        function blockUI($rootScope) {
            $rootScope.blockUI = true;
        }

        function unblockUI($rootScope) {
            $rootScope.blockUI = false;
        }

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|bitcoin):/);

        // public states

        $stateProvider.state('main', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController'
            }).state('payment', {
                url: '/payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController',
                resolve: {
                    payment: function ($stateParams, MobbrPayment) {
                        return MobbrPayment.info({ id: $stateParams.id }).$promise;
                    }
                }
            }).state('payment.username', {
                url: '/:username'
            }).state('x-payment', {
                url: '/x-payment/:id',
                templateUrl: 'views/payment.html',
                controller: 'PaymentReceiptController',
                resolve: {
                    payment: function ($stateParams, MobbrXPayment) {
                        return MobbrXPayment.info({ id: $stateParams.id }).$promise;
                    }
                }

            // public search box states

            //}).state('box', {
                //abstract: true
                //templateUrl: 'views/box.html',
                //controller: 'BoxController'
            }).state('crowds', {
                url: '/crowds/:task',
                params: {
                    task: {
                        value: null
                    }
                },
                controller: 'CrowdsController',
                templateUrl: 'views/crowds.html',
                data: {
                    title: 'Invite workforce'
                },
                resolve: {
                    task: function ($window, $stateParams, MobbrUri) {
                        return $stateParams.task && MobbrUri.info({ url: $window.atob($stateParams.task) }).$promise || null;
                    },
                    taskTags: function (task) {
                        return task && (task.result.script && task.result.script.keywords || task.result.metadata && task.result.metadata.keywords) || null;
                    },
                    suggestedTags: function ($q, $rootScope, taskTags, MobbrKeywords) {

                        return !taskTags && MobbrKeywords.get({
                            limit: 10,
                            language: $rootScope.filter_language,
                            offset: 0
                        }).$promise || null;
                    },
                    persons: function ($rootScope, MobbrPerson, taskTags, $stateParams) {

                        var keywords;
                        if($stateParams.keywords) {
                            keywords = $state.params.keywords.split('+');
                            $scope.filteredTags = keywords;
                        } else {
                            keywords = taskTags;
                        }

                        return MobbrPerson.get({
                            keywords: keywords || null,
                            language: $rootScope.filter_language,
                            limit: 20,
                            offset: 0
                        }).$promise;
                    }
                }
            }).state('crowds.filter', {
                url: '/:keywords'
            }).state('person', {
                url: '/person/:username',
                params: {
                    username: {
                        value: null
                    }
                },
                controller: 'PersonController',
                templateUrl: 'views/person.html',
                data: {
                    title: 'Profile'
                },
                resolve: {
                    person: function (MobbrPerson, $stateParams) {
                        return $stateParams.username && MobbrPerson.info({ username: $stateParams.username }).$promise || null;
                    },
                    keywords: function (MobbrKeywords, $stateParams) {
                        return $stateParams.username && MobbrKeywords.person({ username: $stateParams.username }).$promise || null;
                    }
                }
            }).state('tasks', {
                url: '/tasks/:username',
                params: {
                    username: {
                        value: null
                    }
                },
                controller: 'TasksController',
                templateUrl: 'views/tasks.html',
                data: {
                    title: 'Explore tasks'
                },
                resolve: {
                    tasks: function ($rootScope, $stateParams, $window, MobbrUri) {
                        return MobbrUri.get({
                            limit: 20,
                            language: $rootScope.filter_language,
                            username: $stateParams.username || null,
                            offset: 0
                        }).$promise;
                    },
                    tags: function ($rootScope, $stateParams, MobbrKeywords) {
                        return MobbrKeywords.get({
                            limit: 10,
                            language: $rootScope.filter_language,
                            username: $stateParams.username || null,
                            offset: 0
                        }).$promise;
                    }
                }
            }).state('tasks.filter', {
                url: '/:keywords'
            }).state('task', {
                url: '/task/:task',
                params: {
                    task: {
                        value: null
                    }
                },
                controller: 'TaskController',
                templateUrl: 'views/task.html',
                data: {
                    title: 'Task overview'
                },
                resolve: {
                    task: function (MobbrUri, mobbrSession, $rootScope, $stateParams, $window) {
                        return $stateParams.task && MobbrUri.info({
                            url: $window.atob($stateParams.task),
                            base_currency: mobbrSession.isAuthorized() && $rootScope.$mobbrStorage.user.currency_iso || null
                        }).$promise || null;
                    }
                }
            }).state('task.domain', {
                url: '/domain',
                views: {
                    'task-section': {
                        controller: 'TaskDomainController',
                        templateUrl: 'views/task.domain.html'
                    }
                },
                resolve: {
                    urls: function (MobbrUri, $stateParams, $window) {
                        return MobbrUri.get({
                            domain: purl($window.atob($stateParams.task)).data.attr.host
                        });
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('task.script', {
                url: '/script',
                views: {
                    'task-section': {
                        templateUrl: 'views/task.script.html'
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('task.payments', {
                url: '/payments',
                views: {
                    'task-section': {
                        controller: 'TaskPaymentsController',
                        templateUrl: 'views/task.payments.html'
                    }
                },
                resolve: {
                    payments: function (MobbrPayment, $window, $stateParams) {
                        return MobbrPayment.uri({
                            url: $window.atob($stateParams.task)
                        }).$promise;
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('task.persons', {
                url: '/persons',
                views: {
                    'task-section': {
                        controller: 'TaskPersonsController',
                        templateUrl: 'views/task.persons.html'
                    }
                },
                resolve: {
                    persons: function (MobbrPerson, $window, $stateParams, $rootScope, mobbrSession) {
                        return MobbrPerson.uri({
                            url: $window.atob($stateParams.task),
                            base_currency: mobbrSession.isAuthorized() && $rootScope.$mobbrStorage.user.currency_iso || null
                        }).$promise;
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('task.invite', {
                url: '/invite',
                views: {
                    'task-section': {
                        controller: 'CrowdsController',
                        templateUrl: 'views/crowds.html'
                    }
                },
                resolve: {
                    taskTags: function (task) {
                        return task && (task.result.script && task.result.script.keywords || task.result.metadata && task.result.metadata.keywords) || null;
                    },
                    suggestedTags: function ($q, $rootScope, taskTags, MobbrKeywords) {

                        return !taskTags && MobbrKeywords.get({
                            limit: 10,
                            language: $rootScope.filter_language,
                            offset: 0
                        }).$promise || null;
                    },
                    persons: function ($rootScope, MobbrPerson, taskTags) {

                        return MobbrPerson.get({
                            keywords: taskTags || null,
                            language: $rootScope.filter_language,
                            limit: 20,
                            offset: 0
                        }).$promise;
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('task.pay', {
                url: '/pay',
                views: {
                    'pay': {
                        controller: 'PayController',
                        templateUrl: 'views/pay.html'
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI

            // not authenticated states

            }).state('recover', {
                url: '/recover',
                templateUrl: 'views/recover-password.html',
                controller: 'ResetPasswordController',
                data: { authenticated: false }
            }).state('join', {
                url: '/join',
                templateUrl: 'views/join.html',
                controller: 'JoinController',
                data: { authenticated: false }
            }).state('userlogin', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                data: { authenticated: false }

            // hash confirm states

            }).state('login', {
                url: '/login/:hash',
                templateUrl: 'views/link-login.html',
                controller: 'LinkLoginController'
            }).state('activate', {
                url: '/activate/:hash',
                templateUrl: 'views/activate.html',
                controller: 'LinkLoginController'
            }).state('email', {
                url: '/email/:hash',
                templateUrl: 'views/update-email.html',
                controller: 'UpdateEmailController'
            }).state('id', {
                url: '/id/:hash',
                templateUrl: 'views/update-email.html',
                controller: 'UpdateIdController'

            // authenticated states

            }).state('updates', {
                url: '/updates',
                templateUrl: 'views/updates.html',
                controller: 'UpdatesController',
                data: { authenticated: true },
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
            }).state('wallet', {
                url: '/wallet',
                templateUrl: 'views/wallet.html',
                controller: 'WalletController',
                data: {
                    authenticated: true
                },
                resolve: {
                    balance: function (MobbrBalance) {
                        return MobbrBalance.get().$promise;
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
                resolve: {
                    addresses: function (MobbrXPayment) {
                        return MobbrXPayment.supportedCurrencies().$promise;
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
            }).state('payments', {
                url: '/payments',
                templateUrl: 'views/payments.html',
                controller: 'PaymentsController',
                data: {
                    authenticated: true
                },
                resolve: {
                    payments: function (MobbrPayment) {
                        return MobbrPayment.get().$promise;
                    },
                    pledges: function (MobbrPayment) {
                        return MobbrPayment.pledged().$promise;
                    },
                    unclaimed: function (MobbrPayment) {
                        return MobbrPayment.unclaimedShares().$promise;
                    }
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
                resolve: {
                    task: function () {
                        return null;
                    }
                },
                onEnter: blockUI,
                onExit: unblockUI
            }).state('settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'UserSettingsController',
                data: { authenticated: true }
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
            });

        $urlRouterProvider.when('/task/:task/view', '/task/:task');
        $urlRouterProvider.when('/crowds', '/crowds/');
        $urlRouterProvider.when('/tasks', '/tasks/');
        $urlRouterProvider.when('/task', '/task/');
        $urlRouterProvider.otherwise('/');

    }).run(function ($http, $rootScope, $state, $location, $window, $anchorScroll, filterFilter, MobbrApi, MobbrUser, MobbrBalance, MobbrXPayment, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

        if (environment !== 'production') {
            $window.mobbr.setApiUrl(apiUrl);
            $window.mobbr.setUiUrl(uiUrl);
            $window.mobbr.setLightboxUrl(lightboxUrl);
            $window.mobbr.createDiv();
        }

        function setCurrencies() {
            if (mobbrSession.isAuthorized()) {
                MobbrBalance.get(function (response) {
                    $rootScope.userCurrencies = response.result.balances;
                });
            } else if ($rootScope.networkCurrencies) {
                $rootScope.userCurrencies = $rootScope.networkCurrencies
            }
        }

        $rootScope.$on('$stateChangeSuccess', function () {
            $window.scrollTo(0, 0);
            $window.ga('send', 'pageview', { page: $location.path() });
        });

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
            $rootScope.networkCurrencies = filterFilter($rootScope.currencies.result, { wallet_support: true });
            response.result.forEach(function (item) {
                $rootScope.currenciesMap[item.currency_iso] = item;
            });
            setCurrencies();
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

        MobbrApi.idProviders().$promise.then(function(response){
            $rootScope.idProviders = response.result;
        });

        $rootScope.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        }

        $rootScope.getLanguage = function () {
            return $rootScope.$mobbrStorage.user && $rootScope.$mobbrStorage.user.language_iso || ($window.navigator.userLanguage || $window.navigator.language).toUpperCase();
        }

        $rootScope.filter_language = null;

        $rootScope.encodeTask = function (url) {
            return $window.btoa(url);
        };

        $rootScope.logout = function () {
            //if ($state.current.data.authenticated === true) {
            //    $state.go('main');
            //}
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

        $rootScope.$on('mobbrApi:authchange', setCurrencies);
    }
);
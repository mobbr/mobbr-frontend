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
    }).state('wallet', {
        url: '/wallet',
        templateUrl: 'views/wallet.html',
        controller: 'WalletController',
        data: {
            authenticated: true,
            redirectTo: 'main'
        }
    }).state('wallet.pay', {
        url: '/pay',
            views: {
                'pay@wallet': {
                    controller: 'PayController',
                    templateUrl: 'views/pay.html'
                }
            }
    }).state('wallet.deposit', {
        url: '/deposit',
        templateUrl: 'views/wallet.deposit.html'
    }).state('wallet.withdraw', {
        url: '/withdraw',
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
        controller: 'UrlReceiptController',
        resolve: {
            payment: function ($window, $stateParams, $state, $q, MobbrPayment) {
                return MobbrPayment.preview({
                    data: $window.atob($stateParams.url),
                    referrer: $window.location.href
                }).$promise;
            }
        }
    }).state('box', {
        abstract: true,
        controller: 'BoxController',
        templateUrl: 'views/box.html'
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
    }).state('box.tasks.my', {
        url: '/my'
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
        }
    ).state('box.crowds', {
            url: '/crowds',
            views: {
                'tasks-section': {
                    controller: 'CrowdsController',
                    templateUrl: 'views/crowds.html'
                }
            },
            data: {
                title: 'Find crowds'
            }
        }).state('box.crowds.task', {
            url: '/:task'
        });


    $urlRouterProvider.otherwise('/');

}).run(function ($http, $rootScope, $state, $location, $window, $anchorScroll, MobbrApi, MobbrUser, MobbrBalance, mobbrMsg, mobbrSession, apiUrl, uiUrl, lightboxUrl, environment) {

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
            response.result.forEach(function (item) {
                $rootScope.currenciesMap[item.currency_iso] = item;
            });
        });
        $rootScope.languages = MobbrApi.isoLanguages(function (response) {
            response.result.forEach(function (item) {
                $rootScope.languagesMap[item.code] = item.name;
            });
        });
        $rootScope.countries = MobbrApi.isoCountries(function (response) {
            response.result.forEach(function (item) {
                $rootScope.countriesMap[item.code] = item.name;
            });
        });

        $rootScope.timezones = MobbrApi.isoTimezones();
        $rootScope.incomerangeMap = MobbrApi.kycIncomeRanges();
        $rootScope.host = $location.host();
        $rootScope.oAuthProviders = MobbrApi.oauthProviders();
        $rootScope.state = $state;

        if (environment !== 'production') {
            $window.mobbr.setApiUrl(apiUrl);
            $window.mobbr.setUiUrl(uiUrl);
            $window.mobbr.setLightboxUrl(lightboxUrl);
            $window.mobbr.createDiv();
        }

        $rootScope.login = function (username, password) {
            $rootScope.authenticating = MobbrUser.passwordLogin({ username: username, password: password }, function () {
                //$location.path('/wallet');
                $state.go('wallet.default');
            });
        };


        $rootScope.$on('mobbrApi:authchange', function () {
            if (mobbrSession.isAuthorized()) {
                $rootScope.userBalance = MobbrBalance.get();
            }
        });

        $rootScope.encodeTask = function (url) {
            return $window.btoa(url);
        };

        $rootScope.logout = function () {
            MobbrUser.logout();
            $location.path('/');
        };

        /*function paymentModal(id, external) {
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
        }*/

        $rootScope.openExternalPayment = function (item) {
            $state.go('x-payment', { id: item.id });
            //return paymentModal(item.id, true);
        }

        $rootScope.openPayment = function (item) {
            $state.go('payment', { id: item.id });
            //return paymentModal(item.id);
        }

        $rootScope.getPaymentUrl = function (id, external) {
            return uiUrl + '/#/' + (external && 'x-' || '') + 'payment/' + id;
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
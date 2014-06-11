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

        var ItemsController = function ($scope, $state, ngTableParams, items, $filter) {

            var sorting = {};

            sorting[$scope.sortBy || 'datetime'] = $scope.sortOrder || 'desc';

            $scope.sortTableBy = function (column) {
                sorting = {};
                sorting[column] = $scope.invoiceTable.isSortBy(column, 'asc') ? 'desc' : 'asc';
                $scope.invoiceTable.sorting(sorting);
            }

            $scope.groupby = 'uri';

            $scope.labels = {
                username: 'Name',
                worker_username: 'Name',
                expiration: 'Expiration days',
                datetime: 'Date/time',
                paiddatetime: 'Date/time',
                announceddatetime: 'Date/time',
                payment_service: 'Payment service',
                receive_address: 'Receive address',
                currency_description: 'Currency description',
                gravatar: ' ',
                uri: 'URL',
                role: 'Role',
                currency_iso: 'Currency'
            };

            $scope.columns = $state.current.data.columns || [ 'title', 'username', 'role', 'currency_iso', 'amount' ];
            $scope.groups = $state.current.data.columns ||  [ 'uri', 'username', 'role', 'currency_iso' ];
            $scope.buttonText = $state.current.data.buttonText;
            $scope.buttonAction = $scope[$state.current.data.buttonAction];
            $scope.selectallid = Math.floor(Math.random() * 1000000);
            $scope.selectedIds = [];
            $scope.selectedItems = [];
            $scope.empty_message =  $state.current.data.emptyMessage || 'No items available';
            $scope.checkboxes = { 'checked': false, items: {} };
            $scope.invoiceTable = new ngTableParams(
                {
                    page: 1,
                    count: 10,
                    sorting: sorting,
                    filter: ''
                },
                {
                    groupBy: $scope.groupby,
                    total: 0,
                    getData: function ($defer, params) {

                        items.$promise.then(function (response) {

                            var data = response.result,
                                filteredData = $scope.invoiceTable.filter() ?
                                    $filter('filter')(data, $scope.invoiceTable.filter()) :
                                    data,
                                orderedData = $scope.invoiceTable.sorting() ?
                                    $filter('orderBy')(filteredData, $scope.invoiceTable.orderBy()) :
                                    filteredData;

                            $scope.invoiceTable.total(orderedData.length);
                            $defer.resolve($scope.items = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        });
                    }
                }
            );

            $scope.$watch('groupby', function (value) {
                $scope.invoiceTable.settings().groupBy = value;
                $scope.invoiceTable.reload();
            });

            // watch for check all checkbox
            $scope.$watch('select_all', function (value) {
                console.log($scope.items);
                angular.forEach($scope.items, function (item) {
                    console.log(item);
                    $scope.checkboxes.items[item.id] = value;
                    console.log($scope.checkboxes.items);
                });
            });

            // watch for data checkboxes
            $scope.$watch('checkboxes.items', function (values) {

                if (!$scope.items) {
                    return;
                }

                var checked = 0,
                    unchecked = 0,
                    total = $scope.items.length;

                angular.forEach($scope.items, function (item) {

                    var indexId = $scope.selectedIds.indexOf(item.id),
                        indexItem = $scope.selectedItems.indexOf(item);

                    if ($scope.checkboxes.items[item.id]) {
                        checked++;
                        indexId === -1 && $scope.selectedIds.push(item.id);
                        indexItem === -1 && $scope.selectedItems.push(item);
                    } else {
                        unchecked++;
                        indexId !== -1 && $scope.selectedIds.splice(indexId, 1);
                        indexItem !== -1 && $scope.selectedItems.splice(indexItem, 1);
                    }
                });

                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checked = (checked == total);
                }

                angular.element(document.getElementById($scope.selectallid)).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);
        };

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
                    items: function (MobbrInvoice) {
                        return MobbrInvoice.requestable();
                    }
                },
                data: {
                    buttonText: 'Request invoices',
                    buttonAction: 'requestInvoices'
                },
                controller: ItemsController
            }).state('invoicing.sourcing_pending', {
                url: '/sourcing/pending',
                resolve: {
                    items: function (MobbrInvoice) {
                        return MobbrInvoice.requested();
                    }
                },
                data: {
                    buttonText: 'Cancel request',
                    buttonAction: 'cancelInvoices'
                },
                controller: ItemsController
            }).state('invoicing.sourcing_download', {
                url: '/sourcing/download',
                resolve: {
                    items: function (MobbrInvoice) {
                        return MobbrInvoice.confirmed();
                    }
                },
                data: {
                    buttonText: 'Download invoice',
                    buttonAction: 'downloadInvoices'
                },
                controller: ItemsController
            }).state('invoicing.working_confirm', {
                url: '/working/confirm',
                resolve: {
                    items: function (MobbrInvoice) {
                        return MobbrInvoice.confirmable();
                    }
                },
                data: {
                    buttonText: 'Confirm invoice',
                    buttonAction: 'confirmInvoices'
                },
                controller: ItemsController
            }).state('invoicing.working_download', {
                url: '/working/download',
                resolve: {
                    items: function (MobbrInvoice) {
                        return MobbrInvoice.returned();
                    }
                },
                data: {
                    buttonText: 'Download invoice',
                    buttonAction: 'downloadInvoices'
                },
                controller: ItemsController
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